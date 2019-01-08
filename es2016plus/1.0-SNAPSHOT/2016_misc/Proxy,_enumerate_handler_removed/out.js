module.exports = function() {
  var a = !0, b = new Proxy({}, {enumerate:function() {
    a = !1;
  }});
  for (b in b) {
  }
  return a;
};

