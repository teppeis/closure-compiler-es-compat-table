module.exports = function() {
  var b = Symbol.toStringTag, c = !0;
  [[Array.prototype, []], [String.prototype, ""], [arguments, arguments], [Function.prototype, function() {
  }], [Error.prototype, Error()], [Boolean.prototype, !0], [Number.prototype, 2], [Date.prototype, new Date], [RegExp.prototype, /./]].forEach(function(a) {
    a[0][b] = "foo";
    c &= "[object foo]" === Object.prototype.toString.call(a[1]);
    delete a[0][b];
  });
  return c;
};

