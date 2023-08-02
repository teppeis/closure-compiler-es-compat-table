module.exports = function() {
  var a = [], d = new Proxy({}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Error.prototype.toString.call(d);
  return "name,message" === a + "";
};

