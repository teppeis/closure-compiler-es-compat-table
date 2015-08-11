module.exports = function() {
  return function(a) {
    try {
      return eval("(function(a=a){}())"), !1;
    } catch (b) {
    }
    try {
      return eval("(function(a=b,b){}())"), !1;
    } catch (c) {
    }
    return !0;
  }();
};

