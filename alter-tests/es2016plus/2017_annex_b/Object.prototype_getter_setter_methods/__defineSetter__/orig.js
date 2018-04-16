// 2017 annex b / Object.prototype getter/setter methods / __defineSetter__
module.exports = () => {
  var obj = {};
  function bar() {}
  Object.prototype.__defineSetter__.call(obj, "foo", bar);
  var prop = Object.getOwnPropertyDescriptor(obj, "foo");
  return prop.set === bar && !prop.writable && prop.configurable
&& prop.enumerable;

};