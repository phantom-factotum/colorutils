const THRESHOLD_PRESETS = {
  unacceptable: 3,
  barelyAcceptable: 5,
  acceptable: 11,
  golden: 30,
  perfectionist: 70,
  closeOpposites: 90,
  opposite: 100,
};

const changeThreshold = (threshold, isIncrementing = true) => {
  let keys = Object.keys(THRESHOLD_PRESETS);
  let index = keys.findIndex(t => t == threshold);
  if (index < 0) return threshold;
  index += isIncrementing ? 1 : -1;
  if (index < 0) index = 0;
  if (index > keys.length - 1) index = keys.length - 1;
  return keys[index];
};

const incrementThreshold = threshold => {
  return changeThreshold(threshold, true);
};
const decrementThreshold = threshold => {
  return changeThreshold(threshold, false);
};

const thresholdToDist = threshold => THRESHOLD_PRESETS[threshold];

module.exports = {
  THRESHOLD_PRESETS,
  incrementThreshold,
  decrementThreshold,
  thresholdToDist,
};
