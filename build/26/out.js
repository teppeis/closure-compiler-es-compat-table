module.exports = function() {
  var a = global.__createIterableObject(["b", "c", "d"]);
  return "d" === [].concat(["a"], Object.create(a), ["e"])[3];
};

