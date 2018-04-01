module.exports = function() {
  var a = {}, b = !1;
  Object.defineProperty(new Proxy(a, {defineProperty:function(c, d, e) {
    b = c === a && "foo" === d && 5 === e.value;
    return !0;
  }}), "foo", {value:5, configurable:!0});
  return b;
};

