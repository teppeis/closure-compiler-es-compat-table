// 2017 annex b / Object.prototype getter/setter methods / __defineSetter__, symbols
module.exports = () => {
  var obj = {};
  var sym = Symbol();
  function bar(baz) {}
  Object.prototype.__defineSetter__.call(obj, sym, bar);
  var prop = Object.getOwnPropertyDescriptor(obj, sym);
  return prop.set === bar && !prop.writable && prop.configurable
&& prop.enumerable;

};