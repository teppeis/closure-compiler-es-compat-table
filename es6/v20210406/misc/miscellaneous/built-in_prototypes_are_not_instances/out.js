module.exports = function() {
  try {
    return RegExp.prototype.exec(), !1;
  } catch (a) {
  }
  try {
    return Date.prototype.valueOf(), !1;
  } catch (a) {
  }
  return [Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].every(function(a) {
    return "[object Object]" === Object.prototype.toString.call(a.prototype);
  }) ? !0 : !1;
};

