const Color = require("color-js");

// sometimes its easier to just convert color to rgba and play with opacity
const setColorOpacity = (color, opacity = 1) => {
  color = Color(color);
  const r = Math.floor(color.getRed() * 256);
  const g = Math.floor(color.getGreen() * 256);
  const b = Math.floor(color.getBlue() * 256);
  const newColor = Color(`rgba(${r}, ${g}, ${b}, ${opacity})`);
  return RGBAToHex(newColor.toCSS());
};
// lighten color using Colorjs
const lightenColor = (color, ratio = 0.4) => {
  return Color(color).lightenByRatio(ratio).toCSS();
};
//darken color using Colorjs
const darkenColor = (color, ratio = 0.4) => {
  return Color(color).darkenByRatio(ratio).toCSS();
};
// alter hsv by ratio
const alterHSVByRatio = (color, { h = 1, s = 1, v = 1 }) => {
  return (
    Color(color)
      //shift hue accepts a value between 0-360 so multiply
      //ratio byt this value
      .shiftHue(h * 360)
      .saturateByRatio(s)
      .valueByRatio(v)
      .toCSS()
  );
};
function RGBAToHex(rgba = "") {
  if (!rgba.trim().startsWith("rgba")) return rgba;
  // convert `rgba(r,g,b,a)` into `r,g,b,a`
  rgba = rgba.replace("rgba", "").replace(/\(|\)/g, "");
  // split at commas
  let [r, g, b, a] = rgba.split(",");
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}
const blend = (color1, color2, alpha = 0.5) => {
  color1 = new Color(color1);
  color2 = new Color(color2);
  return color1.blend(color2, alpha).toCSS();
};
module.exports = {
  setColorOpacity,
  lightenColor,
  darkenColor,
  alterHSVByRatio,
  RGBAToHex,
  blend,
};
