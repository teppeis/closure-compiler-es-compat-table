module.exports = function() {
  var a = [], d = new Proxy([0, 1, 2, 3], {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Array.prototype.pop.call(d);
  return "length,3" === a + "";
};

