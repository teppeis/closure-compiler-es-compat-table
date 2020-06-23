module.exports = function() {
  var a = [], d = new Proxy({length:2, 0:0, 1:0}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Function.prototype.apply({}, d);
  return "length,0,1" === a + "";
};

