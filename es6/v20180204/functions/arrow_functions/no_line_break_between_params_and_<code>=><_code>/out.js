module.exports = function() {
  a: {
    try {
      Function("x\n => 2")();
    } catch (b) {
      var a = !0;
      break a;
    }
    a = void 0;
  }
  return a;
};

