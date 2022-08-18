const {
  colorGenerator,
  logColors,
  logColorText,
  getColorDist,
  colorSchemes,
  colorManipulators,
  removeSimilarColors,
  THRESHOLD_PRESETS,
} = require("./index");

const totalColors = 28;
const genConfig = {
  generatorType: "randomSchemes",
  startColor: "#1302FC",
  startThreshold: "golden",
};
const printConfig = {
  printColors: true,
  // colors per line when printing, if not provided
  // will try to fit as many colors as possible
  itemsPerLine: null,
  // whether to show hexCode when printing
  showHexCode: false,
};
const logText = text => {
  logColorText(text, {
    textColor: "#2446DD",
    bgColor: "#7E8FDE",
  });
};
// removeSimilarColors expects a THRESHOLD_PRESETS key or a number between 0-100
// with 0 doing no filtering and 100 accepting only the complementary color
const colorDistPreset = "barelyAcceptable" || 5;

logText("Printing colors with console");
const colors = colorGenerator(totalColors, genConfig);
console.log(colors);

logText("Colors printed using chalk");
logColors(colors, printConfig);

let lightenedColors = colors.map(color =>
  colorManipulators.lightenColor(color, 0.15)
);
let darkenedColors = colors.map(color =>
  colorManipulators.darkenColor(color, 0.15)
);
logText("Generated colors, but a little lighter");
logColors(lightenedColors, printConfig);
logText("Generated colors, but a little darker");
logColors(darkenedColors, printConfig);

let newColors = [];
colors.forEach(color => {
  // add original color
  newColors.push(color);
  // add slightly altered original color
  newColors.push(colorManipulators.lightenColor(color, 0.01));
});
logText("Colors with near duplicates added:");
logColors(newColors, printConfig);
logText("Colors with near duplicates after removeSimilarColors:");
logColors(removeSimilarColors(newColors, colorDistPreset));
