module.exports = function() {
  var a = [];
  "global" in RegExp.prototype && a.push("global");
  "ignoreCase" in RegExp.prototype && a.push("ignoreCase");
  "multiline" in RegExp.prototype && a.push("multiline");
  "dotAll" in RegExp.prototype && a.push("dotAll");
  "unicode" in RegExp.prototype && a.push("unicode");
  "sticky" in RegExp.prototype && a.push("sticky");
  var c = [], b = new Proxy({}, {get:function(e, d) {
    c.push(d);
    return e[d];
  }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get.call(b);
  if (a.length !== c.length) {
    return !1;
  }
  for (b = 0; b < a.length; b++) {
    if (a[b] !== c[b]) {
      return !1;
    }
  }
  return !0;
};

