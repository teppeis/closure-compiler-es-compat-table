module.exports = function() {
  return function(b) {
    try {
      return eval("(function(a=a){}())"), !1;
    } catch (a) {
    }
    try {
      return eval("(function(a=b,b){}())"), !1;
    } catch (a) {
    }
    return !0;
  }();
};

