// built-in extensions / Math methods / Math.trunc
module.exports = function() {
  var nan = Math.trunc(NaN);
  return Math.trunc(0) === 0
    && Math.trunc(-0) === -0
    && Math.trunc(1.1) === 1
    && Math.trunc(-1.1) === -1
    && Math.trunc(0.1) === 0
    && Math.trunc(-0.1) === -0
    && Math.trunc(Infinity) === Infinity
    && Math.trunc(-Infinity) === -Infinity
    && nan !== nan;
};
