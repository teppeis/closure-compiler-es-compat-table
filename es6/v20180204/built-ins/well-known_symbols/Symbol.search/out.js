module.exports = function() {
  var a = {};
  a[Symbol.search] = function() {
    return 42;
  };
  return 42 === "".search(a);
};

