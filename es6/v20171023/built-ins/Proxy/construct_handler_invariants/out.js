module.exports = function() {
  var a = !1;
  new Proxy({}, {});
  try {
    return new new Proxy({}, {construct:function(b, a) {
      return {};
    }}), !1;
  } catch (b) {
  }
  try {
    return new new Proxy(function() {
    }, {construct:function(b, c) {
      a = !0;
      return 5;
    }}), !1;
  } catch (b) {
  }
  return a;
};

