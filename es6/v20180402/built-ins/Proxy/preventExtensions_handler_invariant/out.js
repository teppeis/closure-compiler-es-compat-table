module.exports = function() {
  var a = !1;
  new Proxy({}, {});
  try {
    return Object.preventExtensions(new Proxy({}, {preventExtensions:function() {
      return a = !0;
    }})), !1;
  } catch (b) {
  }
  return a;
};

