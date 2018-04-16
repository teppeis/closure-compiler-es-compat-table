// built-in extensions / Math methods / Math.acosh
module.exports = () => {
  var nan1 = Math.acosh(NaN);
  var nan2 = Math.acosh(-1);
  return Math.acosh(1) === 0
    &&  Math.acosh(Infinity) === Infinity
    && nan1 !== nan1
    && nan2 !== nan2
};
