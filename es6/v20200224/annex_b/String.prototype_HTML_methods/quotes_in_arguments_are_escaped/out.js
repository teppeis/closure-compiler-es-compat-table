module.exports = function() {
  var a, b = ["anchor", "fontcolor", "fontsize", "link"];
  for (a = 0; a < b.length; a++) {
    if (""[b[a]]('"') !== ""[b[a]]("&quot;")) {
      return !1;
    }
  }
  return !0;
};

