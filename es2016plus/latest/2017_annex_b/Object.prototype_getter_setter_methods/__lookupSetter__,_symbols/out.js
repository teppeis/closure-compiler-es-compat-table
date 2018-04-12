module.exports = function() {
  var b = Symbol(), c = Symbol(), a = {};
  Object.defineProperty(a, b, {set:function(a) {
    return "bar";
  }});
  Object.defineProperty(a, c, {value:1});
  return "bar" === Object.prototype.__lookupSetter__.call(a, b)() && void 0 === Object.prototype.__lookupSetter__.call(a, c) && void 0 === Object.prototype.__lookupSetter__.call(a, Symbol());
};

