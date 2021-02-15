module.exports = function() {
  var a = [];
  (new Proxy([0, , 0, , 0, 0], {deleteProperty:function(c, b) {
    a.push(b);
    return delete c[b];
  }})).shift();
  return "0,2,5" === a + "";
};

