module.exports = function() {
  var a = {};
  a[Symbol.match] = function() {
    return 42;
  };
  return 42 === "".match(a);
};

