// built-in extensions / Number properties / Number.MAX_SAFE_INTEGER
/** @suppress {uselessCode} */
module.exports = () => {
  // NOTE: this line is needed to insert polyfill
  Number.MAX_SAFE_INTEGER;
  return Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
};
