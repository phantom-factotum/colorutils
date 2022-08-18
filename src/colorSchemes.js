const Color = require("color-js");
const { removeSimilarColors } = require("./utils/colorComparison");
const getComplementary = color => {
  return Color(color)
    .complementaryScheme()
    .map(c => c.toCSS());
};
const getTetradicScheme = color => {
  return Color(color)
    .tetradicScheme()
    .map(c => c.toCSS());
};
const getTriadicScheme = color => {
  return Color(color)
    .triadicScheme()
    .map(c => c.toCSS());
};
const getNeutralScheme = color => {
  return Color(color)
    .neutralScheme()
    .map(c => c.toCSS());
};
const getAnalogousScheme = color => {
  return Color(color)
    .analogousScheme()
    .map(c => c.toCSS());
};
// combine all schemes for a given color
const getAllSchemes = color => {
  color = Color(color);
  let colorSchemes = [
    ...color.tetradicScheme(),
    ...color.clashScheme(),
    ...color.triadicScheme(),
    ...color.fiveToneAScheme(),
    ...color.fiveToneBScheme(),
    ...color.fiveToneCScheme(),
    ...color.fiveToneDScheme(),
    ...color.fiveToneEScheme(),
    ...color.neutralScheme(),
    ...color.sixToneCWScheme(),
    ...color.sixToneCCWScheme(),
  ];
  // remove duplicates
  return Array.from(new Set(colorSchemes));
  // removeSimilarColors uses getColorDist
  // which no longer gets the proper lab dist
  return removeSimilarColors(colorSchemes, "barelyAcceptable");
};

module.exports = {
  getComplementary,
  getTetradicScheme,
  getTriadicScheme,
  getNeutralScheme,
  getAnalogousScheme,
  getAllSchemes,
};
