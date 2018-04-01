module.exports = function() {
  var a = {}, b = Object.create(a);
  b.foo = 1;
  a.__defineGetter__("foo", function() {
  });
  return void 0 === b.__lookupGetter__("foo");
};

