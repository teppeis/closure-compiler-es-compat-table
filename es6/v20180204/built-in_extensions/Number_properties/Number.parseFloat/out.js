module.exports = function() {
  var a = Function("return this")();
  return "function" === typeof Number.parseFloat && Number.parseFloat === a.parseFloat;
};

