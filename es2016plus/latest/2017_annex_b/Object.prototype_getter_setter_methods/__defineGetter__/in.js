// 2017 annex b / Object.prototype getter/setter methods / __defineGetter__
module.exports = () => {
  var obj = {};
  function bar() { return "bar"; }
  Object.prototype.__defineGetter__.call(obj, "foo", bar);
  var prop = Object.getOwnPropertyDescriptor(obj, "foo");
  return prop.get === bar && !prop.writable && prop.configurable
&& prop.enumerable;

};