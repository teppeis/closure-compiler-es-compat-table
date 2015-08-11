module.exports = function() {
  var a;
  a: {
    try {
      Function("0 || () => 2")();
    } catch (b) {
      a = !0;
      break a;
    }
    a = void 0;
  }
  return a;
};

