// built-in extensions / Number properties / Number.isInteger
module.exports = () => {
  return Number.isInteger(0) === true
    && Number.isInteger(1) === true
    && Number.isInteger(-1) === true
    && Number.isInteger(0.1) === false
    && Number.isInteger(NaN) === false
    && Number.isInteger(Infinity) === false
    && Number.isInteger(-Infinity) === false
    && Number.isInteger(null) === false
};
