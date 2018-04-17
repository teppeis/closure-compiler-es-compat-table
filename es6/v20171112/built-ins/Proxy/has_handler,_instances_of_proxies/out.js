module.exports = function() {
  var a = {}, b = !1;
  Object.create(new Proxy(a, {has:function(c, d) {
    b = c === a && "foo" === d;
  }}));
  return b;
};

