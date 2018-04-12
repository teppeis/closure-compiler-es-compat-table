module.exports = function() {
  var b = [], a = new Proxy({foo:1, bar:2}, {defineProperty:function(a, c, d) {
    b.push(c);
    Object.defineProperty(a, c, d);
    return !0;
  }});
  Object.freeze(a);
  return "foo,bar" === b + "";
};

