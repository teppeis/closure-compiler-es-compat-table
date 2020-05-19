module.exports = function() {
  return "a0b1c" === String.raw({raw:["a", "b", "c"]}, 0, 1);
};

