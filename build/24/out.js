module.exports = function() {
  var a = global.__createIterableObject(["b", "c", "d"]);
  return "d" === [].concat(["a"], a, ["e"])[3];
};

