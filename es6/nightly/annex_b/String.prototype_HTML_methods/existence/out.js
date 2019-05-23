module.exports = function() {
  var a, b = "anchor big bold fixed fontcolor fontsize italics link small strike sub sup".split(" ");
  for (a = 0; a < b.length; a++) {
    if ("function" !== typeof String.prototype[b[a]]) {
      return !1;
    }
  }
  return !0;
};

