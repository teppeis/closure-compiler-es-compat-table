module.exports = function() {
  return 0 === Math.fround(0) && -0 === Math.fround(-0) && Infinity === Math.fround(Infinity) && -Infinity === Math.fround(-Infinity) && 1.5 === Math.fround(1.5) && 1.4 !== Math.fround(1.4);
};

