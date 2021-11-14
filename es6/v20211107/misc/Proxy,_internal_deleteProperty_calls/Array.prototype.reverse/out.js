module.exports = function() {
  var a = [];
  (new Proxy([0, , 2, , 4, , ], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).reverse();
  return "0,4,2" === a + "";
};

