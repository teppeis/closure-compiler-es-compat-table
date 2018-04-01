module.exports = function() {
  return function(b) {
    for (var a = 0; a < arguments.length; ++a) {
    }
    try {
      eval("({set e(...args){}})");
    } catch (c) {
      return !0;
    }
  }();
};

