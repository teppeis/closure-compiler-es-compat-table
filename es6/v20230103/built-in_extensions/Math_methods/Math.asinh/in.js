// built-in extensions / Math methods / Math.asinh
module.exports = () => {
  var nan = Math.asinh(NaN);
  return Math.asinh(0) === 0
    &&  Math.asinh(-0) === -0
    &&  Math.asinh(Infinity) === Infinity
    &&  Math.asinh(-Infinity) === -Infinity
    && nan !== nan
};
