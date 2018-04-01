module.exports = function() {
  a: {
    try {
      Function("0 || () => 2")();
    } catch (b) {
      var a = !0;
      break a;
    }
    a = void 0;
  }
  return a;
};

