const chalk = require("chalk");
// const process = require('process');
const { getComplementary } = require("./colorSchemes");
const { RGBAToHex } = require("./colorManipulation");

const logColorText = (text, config) => {
  let { bgColor, textColor, printColor = true, invertTextColor } = config;
  if (chalk.level < 1) return handleNoColors();
  let style = chalk.visible;
  if (bgColor) {
    bgColor = RGBAToHex(bgColor.toString());
    style = style.bgHex(bgColor);
  }
  if (invertTextColor) {
    textColor = getComplementary(bgColor)[1];
  }
  if (textColor) {
    style = style.hex(textColor.toString());
  }
  text = " " + (text && text) + " ";
  const str = style(text) + chalk.reset();
  printColor && console.log(str);
  return str;
};

const logColors = (colors, config = {}) => {
  let { itemsPerLine, showHexCode, invertTextColor, border = "" } = config;
  const hasColumns = process && process.stdout && process.stdout.columns;
  const lineWidth = hasColumns ? process.stdout.columns : 30;

  let length = 3;
  if (showHexCode) length += Math.max(...colors.map(c => c.length));
  // smallest item per line is 1
  const maxItemsPerLine = Math.max(
    Math.floor((lineWidth - 4) / length),
    1
  );
  if (!itemsPerLine || itemsPerLine > maxItemsPerLine)
    itemsPerLine = maxItemsPerLine;
  let str = "";
  let currentLine = "";
  let startSpacing = Math.max(
    (lineWidth - 2 - itemsPerLine * length) / 2,
    0
  );
  colors.forEach((color, i) => {
    let itemsOnLine = (i + 1) % itemsPerLine;
    let text = showHexCode ? color : "";
    currentLine += logColorText(text, {
      bgColor: color,
      printColor: false,
      invertTextColor,
    });

    currentLine += " ";
    if (itemsOnLine == 0) {
      str += border;
      str +=
        " ".repeat(startSpacing) +
        currentLine +
        " ".repeat(startSpacing - 1);
      str += border + "\n";
      if (i != colors.length - 1) {
        str += border;
        str += " ".repeat(lineWidth - 3);
        str += border + "\n";
        currentLine = "";
      }
    }
    // if on last item add whats left in currentLine to str
    if (i == colors.length - 1 && currentLine) {
      let spaceLeft = Math.max(
        lineWidth - 3 - itemsOnLine * length - startSpacing,
        0
      );
      str +=
        border +
        " ".repeat(startSpacing) +
        currentLine +
        " ".repeat(spaceLeft) +
        border;
    }
  });
  border && console.log((border + " ").repeat(lineWidth / 2));
  console.log(str);
  border && console.log((border + " ").repeat(lineWidth / 2));
};

const handleNoColors = () => {
  console.log("Cannot log colors");
};

module.exports = {
  logColorText,
  logColors,
};
