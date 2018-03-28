module.exports = function() {
  var a = {};
  a[Symbol.split] = function() {
    return 42;
  };
  return 42 === "".split(a);
};

