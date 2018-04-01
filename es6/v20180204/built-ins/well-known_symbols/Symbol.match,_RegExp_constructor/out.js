module.exports = function() {
  var a = /./;
  a[Symbol.match] = !1;
  var b = {constructor:RegExp};
  b[Symbol.match] = !0;
  return RegExp(a) !== a && RegExp(b) === b;
};

