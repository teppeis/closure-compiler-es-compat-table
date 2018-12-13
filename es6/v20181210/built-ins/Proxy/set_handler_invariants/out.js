module.exports = function() {
  var c = !1;
  new Proxy({}, {});
  var a = {}, b = new Proxy(a, {set:function() {
    return c = !0;
  }});
  Object.defineProperty(a, "foo", {value:2, enumerable:!0});
  b.foo = 2;
  try {
    return b.foo = 4, !1;
  } catch (d) {
  }
  Object.defineProperty(a, "bar", {get:function() {
  }, enumerable:!0});
  try {
    return b.bar = 2, !1;
  } catch (d) {
  }
  return c;
};

