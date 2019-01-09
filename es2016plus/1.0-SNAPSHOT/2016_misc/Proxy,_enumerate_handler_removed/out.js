module.exports = function() {
  var a = !0, b = new Proxy({}, {enumerate:function() {
    a = !1;
  }}), c;
  for (c in b) {
  }
  return a;
};

