module.exports = function() {
  try {
    Function("const foo = 1; foo = 2;")();
  } catch (a) {
    return !0;
  }
};

