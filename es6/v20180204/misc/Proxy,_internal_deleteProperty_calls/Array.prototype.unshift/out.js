module.exports = function() {
  var a = [];
  (new Proxy([0, 0, , 0, , 0], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).unshift(0);
  return "5,3" === a + "";
};

