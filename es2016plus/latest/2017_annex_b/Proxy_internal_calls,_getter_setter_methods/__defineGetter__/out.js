module.exports = function() {
  var a = [], e = new Proxy({}, {defineProperty:function(c, b, d) {
    a.push(b);
    Object.defineProperty(c, b, d);
    return !0;
  }});
  Object.prototype.__defineGetter__.call(e, "foo", Object);
  return "foo" === a + "";
};

