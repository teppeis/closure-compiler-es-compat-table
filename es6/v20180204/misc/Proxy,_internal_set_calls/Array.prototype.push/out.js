module.exports = function() {
  var a = [];
  (new Proxy([], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).push(0, 0, 0);
  return "0,1,2,length" === a + "";
};

