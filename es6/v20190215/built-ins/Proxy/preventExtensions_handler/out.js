module.exports = function() {
  var a = {}, b = !1;
  Object.preventExtensions(new Proxy(a, {preventExtensions:function(c) {
    b = c === a;
    return Object.preventExtensions(a);
  }}));
  return b;
};

