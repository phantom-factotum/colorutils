# Color Generator

Dynamically generate colors create simple schemes, and do simple color manipulation

## Usage

```js
import {
  colorGenerator,
  colorManipulators,
  logColors,
  colorSchemes,
} from "@phantom-factotum/colorgenerator";

const totalColors = 28;
const startColor = "#5432FC";
const genConfig = {
  generatorType: "randomSchemes",
  startColor,
};
const printConfig = {
  printColors: true,
  // colors per line when printing
  itemsPerLine: 6,
  // whether to show hexCode when printing
  showHexCode: true,
};
const logText = text => {
  logColorText(text, {
    textColor: "#2446DD",
    bgColor: "#7E8FDE",
  });
};

logText("Printing colors with console");
const colors = colorGenerator(totalColors, genConfig);
console.log(colors);

logText("Colors printed using chalk");
logColors(colors, printConfig);

logText("Generating tetradic color scheme from", startColor);
const colorScheme = colorSchemes.getTetradicScheme(startColor);
logColors(colorScheme);

let lightenedColors = colors.map(color =>
  colorManipulators.lightenColor(color, 0.15)
);
logText("Generated colors, but a little lighter:");
logColors(lightenedColors, printConfig);

let darkenedColors = colors.map(color =>
  colorManipulators.darkenColor(color, 0.18)
);
logText("Generated colors, but a little  darker:");
logColors(darkenedColors, printConfig);
```

---

## colorGenerator(length,generatorConfig)

- length: <_number_>
- generatorConfig: <_object_><br/>Properties shared by all generators:
  - **generatorType**: <_"goldenRatio_ | _"randomSchemes_ |_"random"_>
  - **startColor**: <_string_> first color in list
  ## goldenRatio
  Uses the golden ratio in HSV color space to distance colors. Color distance isnt checked, but colors usually are distinct<br/>goldenRatio config properties:
  - **startHue**: <_number_> [0-1] If startColor is provided, then startHue will be startColor's hue
  - **hueOffset**: <_number_>
  - **saturation**: <_number_> [0-1]
  - **useRandom**: <_boolean_> introduces random variations to colors
  - **variationRatio**: <_number_> [0-1] that determines useRandom maximum color variation
  ## randomScheme
  Grabs a random color, generates the triadic scheme for that color, removes similar colors, and repeats until desired length is reached<br/>randomSchemes config properties:
  - **thresholdLevelAttempts**: <_number_> number of times to attempt getting colors before decreasing threshold level
  - **attemptMultipler**: <_number_> each time the threshold level decreases thresholdLevelAttempts will be multiplied by this value
  - **startThreshold**: <_string_ | _number_>
  ## random
  Grabs random colors. Does not attempt to remove similar colors

returns _\<array\>_ of hexcodes

---

## function logColors(colors,config)

- colors: <_array_> list of hexcodes
- printConfig: <_object_>
  - **itemsPerLine**: <_number_>
  - **showHexCode**: <_boolean_> print hexcode
  - **invertTextColor**:<_boolean_> print text in background color complement

returns _\<array\>_ of logColorText

---

## function logColorText(text,config)

- text: <_string_>
- config: <_object_>
  - **bgColor**:<_string_> hexcode
  - **textColor**:<_string_> hexcode
  - **printColor**:<_boolean_> whether to log result

returns _\<string\>_ manipulated with chalk.js to log colors

---

## colorManipulators

Object containing color manipulator functions:

- **lightenColor(color,ratio)**
  - ratio: _\<number\>_ [0-1] _(recommend [0-0.5])_
- **darkenColor(color,ratio)**
  - ratio: _\<number\>_ [0-1] _(recommend [0-0.5])_
- **alterHSVByRatio(color,{h,s,v})**
  - h | s | v : _\<number\>_ [0-1]
- **setColorOpacity(color,opacity)**
  - opacity: _\<number\>_ between 0-1
- **RGBAToHex(rgba)**
  - rgba: _\<string\>_ rgba string
- **blend(color1,color2,alpha)**
  - color1 | color2 _\<string\>_
  - alpha _\<number\>_ [0-1] blend value

---

## colorSchemes

Object containing scheme functions. Every scheme returns _\<array\>_

- **getComplementary(color)**
- **getTetradicScheme(color)**
- **getTriadicScheme(color)**
- **getNeutralScheme(color)**
- **getAnalogousScheme(color)**
- **getAllSchemes(color)**
