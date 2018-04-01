module.exports = function() {
  var a = [];
  (new Proxy({foo:1, bar:2}, {getOwnPropertyDescriptor:function(c, b) {
    a.push(b);
    return Object.getOwnPropertyDescriptor(c, b);
  }})).hasOwnProperty("garply");
  return "garply" === a + "";
};

