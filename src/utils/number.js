// randomization
 const getRandomRGB = (min=0,max=255)=>{
	let randomRGB = [ getRandom(min,max), getRandom(min,max), getRandom(min,max) ];
	return randomRGB
}
 const randomNegation = num=>{
	return Math.random() > .5 ? -num : num;
}
 const getRandom = (min=0,max=1)=>{
	let range = max - min;
	return Math.random()*range+min;
}

let getRandomNumbers = (len,min,max)=>
	new Array(len).fill(0).map(n=>getRandom(min,max));

  //forces a number to be inclusively between min and max
 const clipValue=(value,min=0,max=1)=>{
	if(value > max)
		return max;
	if(value<min)
		return min;
	return value;
}
module.exports = {
  getRandomRGB,
  randomNegation,
  getRandom,
  getRandomNumbers,
  clipValue
}