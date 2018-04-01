module.exports = function() {
  var a = !1;
  new Proxy({}, {});
  try {
    return Object.getPrototypeOf(new Proxy(Object.preventExtensions({}), {getPrototypeOf:function() {
      a = !0;
      return {};
    }})), !1;
  } catch (b) {
  }
  return a;
};

