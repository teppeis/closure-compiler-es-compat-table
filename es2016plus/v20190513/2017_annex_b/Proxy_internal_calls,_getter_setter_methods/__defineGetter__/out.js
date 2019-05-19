module.exports = function() {
  var b = [], a = new Proxy({}, {defineProperty:function(a, c, d) {
    b.push(c);
    Object.defineProperty(a, c, d);
    return !0;
  }});
  Object.prototype.__defineGetter__.call(a, "foo", Object);
  return "foo" === b + "";
};

