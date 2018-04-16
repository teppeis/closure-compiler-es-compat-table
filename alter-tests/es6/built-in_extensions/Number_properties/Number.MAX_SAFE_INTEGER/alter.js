// built-in extensions / Number properties / Number.MAX_SAFE_INTEGER
module.exports = () => {
  // NOTE: this code seems not to cause polyfill insertion
  return Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
};
