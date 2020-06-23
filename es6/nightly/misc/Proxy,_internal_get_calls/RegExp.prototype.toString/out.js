module.exports = function() {
  var a = [], d = new Proxy({}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  RegExp.prototype.toString.call(d);
  return "source,flags" === a + "";
};

