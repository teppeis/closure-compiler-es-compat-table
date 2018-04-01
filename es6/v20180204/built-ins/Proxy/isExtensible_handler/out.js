module.exports = function() {
  var a = {}, b = !1;
  Object.isExtensible(new Proxy(a, {isExtensible:function(c) {
    b = c === a;
    return !0;
  }}));
  return b;
};

