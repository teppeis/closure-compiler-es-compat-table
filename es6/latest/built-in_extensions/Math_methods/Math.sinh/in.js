// built-in extensions / Math methods / Math.sinh
module.exports = function() {
  var nan = Math.sinh(NaN);
  return Math.sinh(0) === 0
    && Math.sinh(-0) === -0
    && Math.sinh(Infinity) === Infinity
    && Math.sinh(-Infinity) === -Infinity
    && nan !== nan;
};
