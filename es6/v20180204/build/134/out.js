module.exports = function() {
  try {
    Function("if(true) const baz = 1;")();
  } catch (a) {
    return !0;
  }
};

