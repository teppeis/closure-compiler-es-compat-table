var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(b) {
  var a = function() {
  };
  a.prototype = b;
  return new a;
};
$jscomp.underscoreProtoCanBeSet = function() {
  var b = {a:!0}, a = {};
  try {
    return a.__proto__ = b, a.a;
  } catch (c) {
  }
  return !1;
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(b, a) {
  b.__proto__ = a;
  if (b.__proto__ !== a) {
    throw new TypeError(b + " is not extensible");
  }
  return b;
} : null;
$jscomp.inherits = function(b, a) {
  b.prototype = $jscomp.objectCreate(a.prototype);
  b.prototype.constructor = b;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(b, a);
  } else {
    for (c in a) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var d = Object.getOwnPropertyDescriptor(a, c);
          d && Object.defineProperty(b, c, d);
        } else {
          b[c] = a[c];
        }
      }
    }
  }
  b.superClass_ = a.prototype;
};
module.exports = function() {
  var b = function(b) {
    var a = Error.apply(this, arguments);
    this.message = a.message;
    "stack" in a && (this.stack = a.stack);
  };
  $jscomp.inherits(b, Error);
  var a = new b;
  return a instanceof Error && a instanceof b && "[object Error]" === Object.prototype.toString.call(a);
};

