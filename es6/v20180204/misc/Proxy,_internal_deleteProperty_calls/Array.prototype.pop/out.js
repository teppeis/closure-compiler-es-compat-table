module.exports = function() {
  var a = [];
  (new Proxy([0, 0, 0], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).pop();
  return "2" === a + "";
};

