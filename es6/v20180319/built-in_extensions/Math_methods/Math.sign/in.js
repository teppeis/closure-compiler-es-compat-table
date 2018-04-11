// built-in extensions / Math methods / Math.sign
module.exports = function() {
  var nan = Math.sign(NaN);
  return Math.sign(3) === 1
    && Math.sign(-3) === -1
    && Math.sign(0) === 0
    && Math.sign(-0) === -0
    && nan !== nan;
};
