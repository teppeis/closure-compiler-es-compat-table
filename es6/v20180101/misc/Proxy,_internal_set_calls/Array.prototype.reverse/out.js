module.exports = function() {
  var a = [];
  (new Proxy([0, 0, 0, , ], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).reverse();
  return "3,1,2" === a + "";
};

