const Color = require("color-js");
const { clipValue } = require("../utils/number");

module.exports = function goldenRatio(len = 1, options = {}) {
  const PHI = (1 + Math.sqrt(5)) / 2;
  if (!len || len < 1) len = 1;
  let {
    startHue = 0,
    hueOffset = 0,
    saturation = 0.8,
    value = 0.99,
    useRandom = false,
    variationRatio = 0.4,
    startColor,
  } = options;

  if (useRandom) startHue = getRandom();
  if (startColor) {
    startColor = Color(startColor);
    // startHue should be
    startHue = startColor.getHue() / 360;
  }
  // range of value variations
  let sOffset = 0;
  let vOffset = 0;
  let colors = new Array(len).fill(0).map((e, i) => {
    // golden ratio stuff
    startHue += 1 / PHI;
    startHue %= 1;
    if (i == 0 && startColor) {
      return startColor.toCSS();
    }
    // if the variationRatio is being randomize
    if (variationRatio && useRandom) {
      // get randomFloat between -/+  variationRatio/2
      variationRatio = Math.abs(variationRatio / 2);
      sOffset = getRandom(
        -variationRatio * saturation,
        variationRatio * saturation
      );
      vOffset = getRandom(-variationRatio * value, variationRatio * value);
    }
    const color = Color({
      hue: Math.abs((startHue * 360 - hueOffset) % 360),
      saturation: clipValue(saturation + sOffset),
      value: clipValue(value + vOffset),
    });
    return color.toCSS();
  });
  return colors;
};
