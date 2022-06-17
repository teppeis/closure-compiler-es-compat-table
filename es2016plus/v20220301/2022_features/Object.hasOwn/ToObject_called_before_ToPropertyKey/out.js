module.exports = function() {
  var a = !!Object.hasOwn;
  try {
    return Object.hasOwn(null, {toString:function() {
      a = !1;
    }}), !1;
  } catch (b) {
    return a;
  }
};

