const Color = require("color-js");
const { decrementThreshold } = require("../utils/threshold");
const { removeSimilarColors } = require("../utils/colorComparison");
const { getRandomRGB } = require("../utils/number");

module.exports = function (len, config) {
  let {
    // max attempt to generate colors before changing lowering threshold (color distance)
    thresholdLevelAttempts = Math.max(len / 4, 15),
    // color difference preset (see thresholdLevels)
    startThreshold = "perfectionist",
    attemptMultiplier = 1.5,
    startColor,
  } = config;
  // attempts at generating colors at current threshold
  let attempts = 0;
  startColor = Color(startColor || Color(getRandomRGB()));
  let colors = startColor.triadicScheme();
  let threshold = startThreshold;
  while (colors.length < len) {
    if (attempts > thresholdLevelAttempts) {
      threshold = decrementThreshold(threshold);
      attempts = 0;
      // increase the number of attempts per thresholdLevel as the threshold drops
      thresholdLevelAttempts = Math.round(
        thresholdLevelAttempts * attemptMultiplier
      );
    }
    // get random color and generate schemes = require( that color
    let color = Color(getRandomRGB());
    let scheme = color.triadicScheme();
    colors = removeSimilarColors(colors.concat(scheme), threshold);
    attempts++;
  }
  // trim colors to desired length and convert to hex
  colors = colors.slice(0, len).map(c => (c.toCSS ? c.toCSS() : c));
  return colors;
};
