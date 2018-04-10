// 2017 annex b / Object.prototype getter/setter methods / __lookupGetter__, data properties can shadow accessors
module.exports = function() {
  var a = { };
  var b = Object.create(a);
  b.foo = 1;
  a.__defineGetter__("foo", function () {})
  return b.__lookupGetter__("foo") === undefined

};