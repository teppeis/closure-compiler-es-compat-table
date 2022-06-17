// built-in extensions / Math methods / Math.log2
module.exports = () => {
  var nan1 = Math.log2(-1);
  var nan2 = Math.log2(NaN);
  return Math.log2(2) === 1
    && Math.log2(1) === 0
    && Math.log2(0) === -Infinity
    && Math.log2(-0) === -Infinity
    && Math.log2(Infinity) === Infinity
    && nan1 !== nan1
    && nan2 !== nan2;
};
