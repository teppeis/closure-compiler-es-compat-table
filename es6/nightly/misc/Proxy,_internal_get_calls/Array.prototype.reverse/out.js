module.exports = function() {
  var a = [], d = new Proxy([0, , 2, , 4, , ], {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Array.prototype.reverse.call(d);
  return "length,0,4,2" === a + "";
};

