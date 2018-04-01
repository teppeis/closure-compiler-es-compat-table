module.exports = function() {
  var c = !1;
  new Proxy({}, {});
  var a = {}, d = new Proxy(a, {getOwnPropertyDescriptor:function() {
    c = !0;
  }});
  Object.defineProperty(a, "foo", {value:2, writable:!0, enumerable:!0});
  try {
    return Object.getOwnPropertyDescriptor(d, "foo"), !1;
  } catch (b) {
  }
  a.bar = 3;
  Object.preventExtensions(a);
  try {
    return Object.getOwnPropertyDescriptor(d, "bar"), !1;
  } catch (b) {
  }
  try {
    return Object.getOwnPropertyDescriptor(new Proxy(a, {getOwnPropertyDescriptor:function() {
      return {value:2, configurable:!0, writable:!0, enumerable:!0};
    }}), "baz"), !1;
  } catch (b) {
  }
  try {
    return Object.getOwnPropertyDescriptor(new Proxy({}, {getOwnPropertyDescriptor:function() {
      return {value:2, configurable:!1, writable:!0, enumerable:!0};
    }}), "baz"), !1;
  } catch (b) {
  }
  try {
    return Object.getOwnPropertyDescriptor(new Proxy({baz:1}, {getOwnPropertyDescriptor:function() {
      return {value:1, configurable:!1, writable:!0, enumerable:!0};
    }}), "baz"), !1;
  } catch (b) {
  }
  return c;
};

