// built-in extensions / Number properties / Number.isSafeInteger
module.exports = function() {
  return Number.isSafeInteger(3) === true
    && Number.isSafeInteger(3.1) === false
    && Number.isSafeInteger(3.0) === true
    && Number.isSafeInteger(Math.pow(2, 53)) === false
    && Number.isSafeInteger(Math.pow(2, 53) - 1) === true
    && Number.isSafeInteger(NaN) === false
    && Number.isSafeInteger(Infinity) === false
};
