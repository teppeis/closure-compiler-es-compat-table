module.exports = function() {
  function b(a) {
    if (0 >= a) {
      return "foo";
    }
    --a;
    a = 0 >= a ? "bar" : b(a - 1);
    return a;
  }
  return "foo" === b(1E6) && "bar" === b(1000001);
};

