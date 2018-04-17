var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, b) {
  a != Array.prototype && a != Object.prototype && (a[d] = b.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var a = 0;
  return function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + a++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(a) {
  var d = 0;
  return $jscomp.iteratorPrototype(function() {
    return d < a.length ? {done:!1, value:a[d++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {next:a};
  a[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
$jscomp.makeIterator = function(a) {
  $jscomp.initSymbolIterator();
  var d = a[Symbol.iterator];
  return d ? d.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.polyfill = function(a, d, b, e) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var g = a[e];
      g in b || (b[g] = {});
      b = b[g];
    }
    a = a[a.length - 1];
    e = b[a];
    d = d(e);
    d != e && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d(a) {
    $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value:{}});
  }
  function b(a) {
    var c = Object[a];
    c && (Object[a] = function(a) {
      d(a);
      return c(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), c = Object.seal({}), f = new a([[b, 2], [c, 3]]);
      if (2 != f.get(b) || 3 != f.get(c)) {
        return !1;
      }
      f.delete(b);
      f.set(c, 4);
      return !f.has(b) && 4 == f.get(c);
    } catch (k) {
      return !1;
    }
  }()) {
    return a;
  }
  var e = "$jscomp_hidden_" + Math.random().toString().substring(2);
  b("freeze");
  b("preventExtensions");
  b("seal");
  var g = 0, h = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  h.prototype.set = function(a, c) {
    d(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = c;
    return this;
  };
  h.prototype.get = function(a) {
    return $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  h.prototype.delete = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return h;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  if (!$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), f = new a($jscomp.makeIterator([[c, "s"]]));
      if ("s" != f.get(c) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var k = f.entries(), b = k.next();
      if (b.done || b.value[0] != c || "s" != b.value[1]) {
        return !1;
      }
      b = k.next();
      return b.done || 4 != b.value[0].x || "t" != b.value[1] || !k.next().done ? !1 : !0;
    } catch (m) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, b = function(a) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var c; !(c = a.next()).done;) {
        c = c.value, this.set(c[0], c[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    var c = e(this, a);
    c.list || (c.list = this.data_[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, c.list.push(c.entry), this.head_.previous.next = c.entry, this.head_.previous = c.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return !!e(this, a).entry;
  };
  b.prototype.get = function(a) {
    return (a = e(this, a).entry) && a.value;
  };
  b.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  b.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  b.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  b.prototype.forEach = function(a, b) {
    for (var c = this.entries(), d; !(d = c.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var e = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++l, d.set(b, c)) : c = "p_" + b;
    var e = a.data_[c];
    if (e && $jscomp.owns(a.data_, c)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:c, list:e, index:a, entry:f};
        }
      }
    }
    return {id:c, list:e, index:-1, entry:void 0};
  }, g = function(a, b) {
    var c = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (c) {
        for (; c.head != a.head_;) {
          c = c.previous;
        }
        for (; c.next != c.head;) {
          return c = c.next, {done:!1, value:b(c)};
        }
        c = null;
      }
      return {done:!0, value:void 0};
    });
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return b;
}, "es6", "es3");
module.exports = function() {
  var a = {}, d = {}, b = new Map([[a, 123], [d, 456]]);
  return b.has(a) && 123 === b.get(a) && b.has(d) && 456 === b.get(d);
};

