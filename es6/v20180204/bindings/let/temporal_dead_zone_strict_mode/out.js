module.exports = function() {
  a: {
    try {
      a;
    } catch (b) {
      var a = !0;
      break a;
    }
    a = void 0;
  }
  return a & 1;
};

