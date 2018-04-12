// built-in extensions / Math methods / Math.fround
module.exports = function() {
  return Math.fround(0) === 0
    && Math.fround(-0) === -0
    && Math.fround(Infinity) === Infinity
    && Math.fround(-Infinity) === -Infinity
    && Math.fround(1.5) === 1.5
    && Math.fround(1.4) !== 1.4;
};
