const Color = require("color-js");

const goldenRatioGenerator = require("./src/generators/goldenRatio");
const randomGenerator = require("./src/generators/random");
const randomSchemeGenerator = require("./src/generators/randomWithSchemes");
const { getRandomRGB } = require("./src/utils/number");
const { logColors, logColorText } = require("./src/logColors");
const colorManipulators = require("./src/colorManipulation");
const colorSchemes = require("./src/colorSchemes");
const { getColorDist } = require("./src/utils/colorComparison");
const { removeSimilarColors } = require("./src/utils/colorComparison");
const { THRESHOLD_PRESETS } = require("./src/utils/threshold");

function colorGenerator(len = 1, genConfig = {}, printConfig = {}) {
  switch (genConfig.generatorType) {
    case "random": {
      let colors = randomGenerator(len, genConfig);
      if (printConfig.printColors) logColors(colors, printConfig);
      return colors;
    }
    case "randomSchemes": {
      let colors = randomSchemeGenerator(len, genConfig);
      if (printConfig.printColors) logColors(colors, printConfig);
      return colors;
    }
    default: {
      let colors = goldenRatioGenerator(len, genConfig);
      if (printConfig.printColors) logColors(colors, printConfig);
      return colors;
    }
  }
}
const sharedProps = ["startColor"];
const generatorConfigProps = {
  goldenRatio: ["startHue", "useRandom", "varioRatio", "value"].concat(
    sharedProps
  ),
  random: [].concat(sharedProps),
  randomSchemes: [
    "thresholdAttemptLevelAttempts",
    "startThreshold",
    "attemptMultiplier",
  ].concat(sharedProps),
};
//  other useful items
module.exports = {
  colorGenerator,
  logColors,
  logColorText,
  removeSimilarColors,
  colorManipulators,
  colorSchemes,
  getColorDist,
  THRESHOLD_PRESETS,
  generatorConfigProps,
};
