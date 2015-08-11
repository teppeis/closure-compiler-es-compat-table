module.exports = function() {
  return function(c, d) {
    for (var b = [], a = 1;a < arguments.length;++a) {
      b[a - 1] = arguments[a];
    }
    return b instanceof Array && "bar,baz" === b + "";
  }("foo", "bar", "baz");
};

