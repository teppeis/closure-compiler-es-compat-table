module.exports = function() {
  var b = [], c = !1, e = new Proxy({}, {getPrototypeOf:function(a) {
    c = !0;
    return Object.getPrototypeOf(a);
  }, getOwnPropertyDescriptor:function(a, d) {
    b.push(d);
    return Object.getOwnPropertyDescriptor(a, d);
  }});
  Object.prototype.__lookupSetter__.call(e, "foo");
  return "foo" === b + "" && c;
};

