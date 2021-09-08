module.exports = function() {
  var b = !1;
  new Proxy({}, {});
  try {
    return new (new Proxy({}, {construct:function(a, c) {
      return {};
    }}))(), !1;
  } catch (a) {
  }
  try {
    return new (new Proxy(function() {
    }, {construct:function(a, c) {
      b = !0;
      return 5;
    }}))(), !1;
  } catch (a) {
  }
  return b;
};

