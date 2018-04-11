// built-in extensions / Math methods / Math.log10
module.exports = function() {
  var nan1 = Math.log10(-1);
  var nan2 = Math.log10(NaN);
  return Math.log10(1) === 0
    && Math.log10(10) === 1
    && Math.log10(0) === -Infinity
    && Math.log10(-0) === -Infinity
    && Math.log10(Infinity) === Infinity
    && nan1 !== nan1
    && nan2 !== nan2;
};
