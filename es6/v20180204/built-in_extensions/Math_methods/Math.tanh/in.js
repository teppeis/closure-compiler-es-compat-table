// built-in extensions / Math methods / Math.tanh
module.exports = function() {
  var nan = Math.tanh(NaN);
  return Math.tanh(0) === 0
    && Math.tanh(-0) === -0
    && Math.tanh(Infinity) === 1
    && Math.tanh(-Infinity) === -1
    && nan !== nan;
};
