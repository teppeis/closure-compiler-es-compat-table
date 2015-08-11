module.exports = function() {
  return "foo" === function b(a) {
    return 0 >= a ? "foo" : b(a - 1);
  }(1E6);
};

