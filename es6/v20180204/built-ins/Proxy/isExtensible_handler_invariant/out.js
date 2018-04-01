module.exports = function() {
  new Proxy({}, {});
  try {
    return Object.isExtensible(new Proxy({}, {isExtensible:function(a) {
      return !1;
    }})), !1;
  } catch (a) {
  }
  try {
    return Object.isExtensible(new Proxy(Object.preventExtensions({}), {isExtensible:function(a) {
      return !0;
    }})), !1;
  } catch (a) {
  }
  return !0;
};

