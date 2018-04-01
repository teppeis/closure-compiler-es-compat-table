module.exports = function() {
  var a = [];
  (new Proxy([], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).pop();
  return "length" === a + "";
};

