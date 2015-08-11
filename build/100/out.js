module.exports = function() {
  var a;
  a: {
    try {
      456;
    } catch (b) {
      a = !0;
      break a;
    }
    a = void 0;
  }
  return a & 1;
};

