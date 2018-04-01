module.exports = function() {
  var b = !1;
  new Proxy({}, {});
  var a = Object.preventExtensions({});
  a = new Proxy(a, {defineProperty:function() {
    return b = !0;
  }});
  try {
    return Object.defineProperty(a, "foo", {value:2}), !1;
  } catch (c) {
  }
  try {
    return Object.defineProperty(new Proxy({bar:!0}, {defineProperty:function() {
      return !0;
    }}), "bar", {value:5, configurable:!1, writable:!0, enumerable:!0}), !1;
  } catch (c) {
  }
  return b;
};

