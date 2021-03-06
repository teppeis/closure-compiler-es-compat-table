// 2017 annex b / Object.prototype getter/setter methods / __lookupGetter__, symbols
module.exports = () => {
  var sym = Symbol();
  var sym2 = Symbol();
  var obj = {};
  Object.defineProperty(obj, sym, { get: function() { return "bar"; }});
  Object.defineProperty(obj, sym2, { value: 1 });
  var foo = Object.prototype.__lookupGetter__.call(obj, sym);
  return foo() === "bar"
&& Object.prototype.__lookupGetter__.call(obj, sym2) === void undefined
&& Object.prototype.__lookupGetter__.call(obj, Symbol()) === void undefined;

};