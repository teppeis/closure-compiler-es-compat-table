// built-in extensions / Number properties / Number.MAX_SAFE_INTEGER
module.exports = () => {
  // NOTE: this code seems not to cause polyfill insertion
  var a = Number.MAX_SAFE_INTEGER;
  return a === Math.pow(2, 53) - 1;
};
