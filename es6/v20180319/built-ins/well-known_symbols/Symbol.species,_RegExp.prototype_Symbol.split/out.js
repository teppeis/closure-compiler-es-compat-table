module.exports = function() {
  var b = !1, a = {constructor:{}};
  a[Symbol.split] = RegExp.prototype[Symbol.split];
  a.constructor[Symbol.species] = function() {
    b = !0;
    return /./;
  };
  "".split(a);
  return b;
};

