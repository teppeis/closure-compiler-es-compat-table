module.exports = function() {
  var a = !1;
  new Proxy({}, {});
  var b = {};
  Object.defineProperty(b, "foo", {value:2, writable:!0, enumerable:!0});
  try {
    return delete (new Proxy(b, {deleteProperty:function() {
      return a = !0;
    }})).foo, !1;
  } catch (c) {
  }
  return a;
};

