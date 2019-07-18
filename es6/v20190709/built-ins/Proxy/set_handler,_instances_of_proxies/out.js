module.exports = function() {
  var a = {}, b = !1, c = Object.create(new Proxy(a, {set:function(d, e, f, g) {
    b = d === a && "foobar" === e + f && g === c;
  }}));
  c.foo = "bar";
  return b;
};

