module.exports = function() {
  var a = [], e = new Proxy({foo:1, bar:2}, {defineProperty:function(c, b, d) {
    a.push(b);
    Object.defineProperty(c, b, d);
    return !0;
  }});
  Object.freeze(e);
  return "foo,bar" === a + "";
};

