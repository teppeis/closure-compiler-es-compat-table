// built-in extensions / Math methods / Math.cosh
module.exports = () => {
  var nan = Math.cosh(NaN);
  return Math.cosh(0) === 1
    && Math.cosh(-0) === 1
    && Math.cosh(Infinity) === Infinity
    && Math.cosh(-Infinity) === Infinity
    && nan !== nan;
};
