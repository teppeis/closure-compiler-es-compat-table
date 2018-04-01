module.exports = function() {
  var b = !1, a = function() {
  };
  Object.defineProperty(a, Symbol.hasInstance, {value:function(a) {
    b = a.foo;
    return !1;
  }});
  ({foo:!0}) instanceof a;
  return b;
};

