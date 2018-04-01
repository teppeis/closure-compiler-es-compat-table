module.exports = function() {
  var a = Function("return this")();
  return "function" === typeof Number.parseInt && Number.parseInt === a.parseInt;
};

