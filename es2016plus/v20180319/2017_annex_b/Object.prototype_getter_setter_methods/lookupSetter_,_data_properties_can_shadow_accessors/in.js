// 2017 annex b / Object.prototype getter/setter methods / __lookupSetter__, data properties can shadow accessors
module.exports = function() {
  var a = {};
  var b = Object.create(a);
  b.foo = 1;
  a.__defineSetter__("foo", function() {});
  return b.__lookupSetter__("foo") === undefined;
};
