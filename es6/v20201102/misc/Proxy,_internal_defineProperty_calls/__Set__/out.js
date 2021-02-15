module.exports = function() {
  var a = [], c = new Proxy({foo:1, bar:2}, {defineProperty:function(d, b, e) {
    a.push(b);
    Object.defineProperty(d, b, e);
    return !0;
  }});
  c.foo = 2;
  c.bar = 4;
  return "foo,bar" === a + "";
};

