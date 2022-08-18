const Color = require( "color-js");
const { getRandomRGB } = require( "../utils/number");
// generates random color without checking color distance/similarity
module.exports = function(num,config={}){
  
	let colors = Array(num).fill(0).map((e,i)=>{
    if(i == 0 && config.startColor)
      return Color(config.startColor).toCSS();
		return Color(getRandomRGB()).toCSS();
	});
	return colors;
}