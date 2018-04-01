module.exports = function() {
  var b = Symbol(), c = Symbol(), a = {};
  Object.defineProperty(a, b, {get:function() {
    return "bar";
  }});
  Object.defineProperty(a, c, {value:1});
  return "bar" === Object.prototype.__lookupGetter__.call(a, b)() && void 0 === Object.prototype.__lookupGetter__.call(a, c) && void 0 === Object.prototype.__lookupGetter__.call(a, Symbol());
};

