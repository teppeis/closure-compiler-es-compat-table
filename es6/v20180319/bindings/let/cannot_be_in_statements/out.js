module.exports = function() {
  try {
    Function("if(true) let baz = 1;")();
  } catch (a) {
    return !0;
  }
};

