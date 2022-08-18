const Color = require("color-js");
const convert = require("color-convert");
const deltaE = require("delta-e");
const { thresholdToDist } = require("./threshold");

// lab color dist is a scale to 100

// l*a*b* color dist
const getColorDist = (color1, color2) => {
  // if color isnt a color object, then convert it
  color1 = Color(color1);
  color2 = Color(color2);
  // convert color object to l*a*b*

  let lab1 = convert.hex.lab(color1.toCSS());
  let lab2 = convert.hex.lab(color2.toCSS());
  // console.log(lab1, lab2);
  let labResult = getDeltaE(lab1, lab2);
  // console.log(rgbResult, labResult);
  return labResult;
};

const getDeltaE = (lab1, lab2, deltaType) => {
  if (Array.isArray(lab1)) lab1 = { L: lab1[0], A: lab1[1], B: lab1[2] };
  if (Array.isArray(lab2)) lab2 = { L: lab2[0], A: lab2[1], B: lab2[2] };
  let deltaFunction = deltaE.getDeltaE00;
  if (deltaType == 1976) deltaFunction = deltaE.getDeltaE76;
  else if (deltaType == 1994) deltaFunction = deltaE.getDeltaE94;
  return deltaFunction(lab1, lab2);
};

// uses l*a*b* dist to remove similar colors
const removeSimilarColors = (
  colors,
  thresholdLevel = "barelyAcceptable",
  showRemovals = true
) => {
  let minDist;
  if (typeof thresholdLevel == "string")
    minDist = thresholdToDist(thresholdLevel);
  if (typeof thresholdLevel == "number") minDist = thresholdLevel;
  else minDist = thresholdToDist("barelyAcceptable");
  let deleteIndices = [];
  colors.forEach((color1, i) => {
    if (deleteIndices.find(index => i == index)) return;
    colors.forEach((color2, j) => {
      if (i == j || deleteIndices.find(index => index == j)) return;
      let dist = getColorDist(color1, color2);
      if (dist < minDist) {
        deleteIndices.push(j);
      }
    });
  });
  // return the colors with indices that arent in deleteIndices
  return colors.filter(
    (color, i) => !deleteIndices.find(index => index == i)
  );
};

module.exports = {
  getColorDist,
  removeSimilarColors,
};
