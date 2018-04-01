module.exports = function() {
  var a = {};
  a[Symbol.replace] = function() {
    return 42;
  };
  return 42 === "".replace(a);
};

