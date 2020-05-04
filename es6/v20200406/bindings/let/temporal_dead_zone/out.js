module.exports = function() {
  a: {
    try {
      456;
    } catch (b) {
      var a = !0;
      break a;
    }
    a = void 0;
  }
  return a & 1;
};

