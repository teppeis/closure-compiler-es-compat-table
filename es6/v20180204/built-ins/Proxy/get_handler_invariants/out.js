module.exports = function() {
  var b = !1, a = {}, c = new Proxy(a, {get:function() {
    b = !0;
    return 4;
  }});
  Object.defineProperty(a, "foo", {value:5, enumerable:!0});
  try {
    return c.foo, !1;
  } catch (d) {
  }
  Object.defineProperty(a, "bar", {set:function() {
  }, enumerable:!0});
  try {
    return c.bar, !1;
  } catch (d) {
  }
  return b;
};

