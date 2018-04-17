module.exports = function() {
  var a = function() {
  }, b = !1;
  new new Proxy(a, {construct:function(c, d) {
    b = c === a && "foo,bar" === d + "";
    return {};
  }})("foo", "bar");
  return b;
};

