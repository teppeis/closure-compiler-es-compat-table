// built-in extensions / Math methods / Math.atanh
module.exports = function() {
  var nan1 = Math.atanh(NaN);
  var nan2 = Math.atanh(2);
  var nan3 = Math.atanh(-2);
  return Math.atanh(0) === 0
    && Math.atanh(-0) === -0
    && Math.atanh(1) === Infinity
    && Math.atanh(-1) === -Infinity
    && nan1 !== nan1
    && nan2 !== nan2
    && nan3 !== nan3;
};
