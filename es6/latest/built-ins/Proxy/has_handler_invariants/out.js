module.exports = function() {
  var b = !1;
  new Proxy({}, {});
  var a = {}, c = new Proxy(a, {has:function() {
    b = !0;
    return !1;
  }});
  Object.defineProperty(a, "foo", {value:2, writable:!0, enumerable:!0});
  try {
    return "foo" in c, !1;
  } catch (d) {
  }
  a.bar = 2;
  Object.preventExtensions(a);
  try {
    return "bar" in c, !1;
  } catch (d) {
  }
  return b;
};

