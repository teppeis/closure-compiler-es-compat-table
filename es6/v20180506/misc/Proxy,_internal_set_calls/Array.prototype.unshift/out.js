module.exports = function() {
  var a = [];
  (new Proxy([0, 0, , 0], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).unshift(0, 1);
  return "5,3,2,0,1,length" === a + "";
};

