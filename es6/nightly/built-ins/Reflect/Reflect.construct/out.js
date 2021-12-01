var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, a) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[c] = a.value;
  return b;
};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global,];
  for (var c = 0; c < b.length; ++c) {
    var a = b[c];
    if (a && a.Math == Math) {
      return a;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(b, c) {
  var a = $jscomp.propertyToPolyfillSymbol[c];
  if (null == a) {
    return b[c];
  }
  a = b[a];
  return void 0 !== a ? a : b[c];
};
$jscomp.polyfill = function(b, c, a, e) {
  c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(b, c, a, e) : $jscomp.polyfillUnisolated(b, c, a, e));
};
$jscomp.polyfillUnisolated = function(b, c, a, e) {
  a = $jscomp.global;
  b = b.split(".");
  for (e = 0; e < b.length - 1; e++) {
    var d = b[e];
    if (!(d in a)) {
      return;
    }
    a = a[d];
  }
  b = b[b.length - 1];
  e = a[b];
  c = c(e);
  c != e && null != c && $jscomp.defineProperty(a, b, {configurable:!0, writable:!0, value:c});
};
$jscomp.polyfillIsolated = function(b, c, a, e) {
  var d = b.split(".");
  b = 1 === d.length;
  e = d[0];
  e = !b && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < d.length - 1; f++) {
    var g = d[f];
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  d = d[d.length - 1];
  a = $jscomp.IS_SYMBOL_NATIVE && "es6" === a ? e[d] : null;
  c = c(a);
  null != c && (b ? $jscomp.defineProperty($jscomp.polyfills, d, {configurable:!0, writable:!0, value:c}) : c !== a && (void 0 === $jscomp.propertyToPolyfillSymbol[d] && (a = 1e9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + a + "$" + d), $jscomp.defineProperty(e, $jscomp.propertyToPolyfillSymbol[d], {configurable:!0, writable:!0, value:c})));
};
$jscomp.polyfill("Reflect", function(b) {
  return b ? b : {};
}, "es6", "es3");
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(b) {
  var c = function() {
  };
  c.prototype = b;
  return new c();
};
$jscomp.getConstructImplementation = function() {
  function b() {
    function a() {
    }
    new a();
    Reflect.construct(a, [], function() {
    });
    return new a() instanceof a;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
    if (b()) {
      return Reflect.construct;
    }
    var c = Reflect.construct;
    return function(a, e, d) {
      a = c(a, e);
      d && Reflect.setPrototypeOf(a, d.prototype);
      return a;
    };
  }
  return function(a, e, d) {
    void 0 === d && (d = a);
    d = $jscomp.objectCreate(d.prototype || Object.prototype);
    return Function.prototype.apply.call(a, d, e) || d;
  };
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.polyfill("Reflect.construct", function(b) {
  return $jscomp.construct;
}, "es6", "es3");
module.exports = function() {
  return "foobarbaz" === Reflect.construct(function(b, c, a) {
    this.qux = b + c + a;
  }, ["foo", "bar", "baz"]).qux;
};

