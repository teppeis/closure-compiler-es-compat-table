module.exports = function() {
  var a = [], d = new Proxy({exec:function() {
    return null;
  }}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  RegExp.prototype.test.call(d);
  return "exec" === a + "";
};

