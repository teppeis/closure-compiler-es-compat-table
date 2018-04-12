module.exports = function() {
  var a = {}, b = Object.create(a);
  b.foo = 1;
  a.__defineSetter__("foo", function() {
  });
  return void 0 === b.__lookupSetter__("foo");
};

