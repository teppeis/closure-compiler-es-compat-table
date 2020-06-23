module.exports = function() {
  var a = Object.getOwnPropertyDescriptor({get foo() {
  }, set foo(b) {
  }}, "foo");
  return "get foo" === a.get.name && "set foo" === a.set.name;
};

