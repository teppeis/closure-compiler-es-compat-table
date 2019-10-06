// 2017 annex b / Object.prototype getter/setter methods / __defineGetter__, symbols
module.exports = () => {
  var obj = {};
  var sym = Symbol();
  function bar() { return "bar"; }
  Object.prototype.__defineGetter__.call(obj, sym, bar);
  var prop = Object.getOwnPropertyDescriptor(obj, sym);
  return prop.get === bar && !prop.writable && prop.configurable
&& prop.enumerable;

};