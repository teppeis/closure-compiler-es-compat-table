// built-in extensions / Math methods / Math.log1p
module.exports = function() {
  var nan1 = Math.log1p(-2);
  var nan2 = Math.log1p(NaN);
  return Math.log1p(-1) === -Infinity
    && Math.log1p(0) === 0
    && Math.log1p(-0) === -0
    && Math.log1p(Infinity) === Infinity
    && nan1 !== nan1
    && nan2 !== nan2;
};
