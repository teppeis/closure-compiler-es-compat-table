module.exports = function() {
  var a = [];
  (new Proxy([0, 0, , 0], {set:function(c, b, d) {
    a.push(b);
    c[b] = d;
    return !0;
  }})).shift();
  return "0,2,length" === a + "";
};

