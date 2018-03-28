module.exports = function() {
  for (var a = "copyWithin every fill filter find findIndex forEach indexOf join lastIndexOf map reduce reduceRight some".split(" "), c, d = new Proxy({length:2, 0:"", 1:""}, {get:function(b, a) {
    c.push(a);
    return b[a];
  }}), b = 0; b < a.length; b += 1) {
    if (c = [], Array.prototype[a[b]].call(d, Function()), c + "" !== ("fill" === a[b] ? "length" : "every" === a[b] ? "length,0" : "lastIndexOf" === a[b] || "reduceRight" === a[b] ? "length,1,0" : "length,0,1")) {
      return !1;
    }
  }
  return !0;
};

