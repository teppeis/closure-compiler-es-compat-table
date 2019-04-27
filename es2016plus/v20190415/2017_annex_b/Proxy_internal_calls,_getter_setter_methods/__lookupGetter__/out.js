module.exports = function() {
  var c = [], a = !1, d = new Proxy({}, {getPrototypeOf:function(b) {
    a = !0;
    return Object.getPrototypeOf(b);
  }, getOwnPropertyDescriptor:function(b, a) {
    c.push(a);
    return Object.getOwnPropertyDescriptor(b, a);
  }});
  Object.prototype.__lookupGetter__.call(d, "foo");
  return "foo" === c + "" && a;
};

