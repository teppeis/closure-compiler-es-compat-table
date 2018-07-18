module.exports = function() {
  var a = [];
  (new Proxy([1, 2, 3], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).splice(1, 0, 0);
  return "3,2,1,length" === a + "";
};

