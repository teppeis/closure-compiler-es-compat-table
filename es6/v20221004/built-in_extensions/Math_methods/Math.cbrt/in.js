// built-in extensions / Math methods / Math.cbrt
module.exports = () => {
  var nan = Math.cbrt(NaN);
  return Math.cbrt(-1) === -1 
    && Math.cbrt(64) === 4
    && Math.cbrt(0) === 0
    && Math.cbrt(-0) === -0
    && Math.cbrt(Infinity) === Infinity
    && Math.cbrt(-Infinity) === -Infinity
};
