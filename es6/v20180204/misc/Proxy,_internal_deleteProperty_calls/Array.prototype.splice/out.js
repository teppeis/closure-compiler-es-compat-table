module.exports = function() {
  var a = [];
  (new Proxy([0, 0, 0, 0, , 0], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).splice(2, 2, 0);
  return "3,5" === a + "";
};

