var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, e, c) {
  a != Array.prototype && a != Object.prototype && (a[e] = c.value);
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
  return function(e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + a++;
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
  var e = 0;
  return $jscomp.iteratorPrototype(function() {
    return e < a.length ? {done:!1, value:a[e++]} : {done:!0};
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
  var e = a[Symbol.iterator];
  return e ? e.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, e) {
  return Object.prototype.hasOwnProperty.call(a, e);
};
$jscomp.polyfill = function(a, e, c, d) {
  if (e) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var g = a[d];
      g in c || (c[g] = {});
      c = c[g];
    }
    a = a[a.length - 1];
    d = c[a];
    e = e(d);
    e != d && null != e && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:e});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function e(a) {
    $jscomp.owns(a, d) || $jscomp.defineProperty(a, d, {value:{}});
  }
  function c(a) {
    var b = Object[a];
    b && (Object[a] = function(a) {
      e(a);
      return b(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({}), b = Object.seal({}), f = new a([[c, 2], [b, 3]]);
      if (2 != f.get(c) || 3 != f.get(b)) {
        return !1;
      }
      f.delete(c);
      f.set(b, 4);
      return !f.has(c) && 4 == f.get(b);
    } catch (k) {
      return !1;
    }
  }()) {
    return a;
  }
  var d = "$jscomp_hidden_" + Math.random().toString().substring(2);
  c("freeze");
  c("preventExtensions");
  c("seal");
  var g = 0, h = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  h.prototype.set = function(a, b) {
    e(a);
    if (!$jscomp.owns(a, d)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[d][this.id_] = b;
    return this;
  };
  h.prototype.get = function(a) {
    return $jscomp.owns(a, d) ? a[d][this.id_] : void 0;
  };
  h.prototype.has = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_);
  };
  h.prototype.delete = function(a) {
    return $jscomp.owns(a, d) && $jscomp.owns(a[d], this.id_) ? delete a[d][this.id_] : !1;
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
      var b = Object.seal({x:4}), f = new a($jscomp.makeIterator([[b, "s"]]));
      if ("s" != f.get(b) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var k = f.entries(), c = k.next();
      if (c.done || c.value[0] != b || "s" != c.value[1]) {
        return !1;
      }
      c = k.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !k.next().done ? !1 : !0;
    } catch (m) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var e = new WeakMap, c = function(a) {
    this.data_ = {};
    this.head_ = h();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        b = b.value, this.set(b[0], b[1]);
      }
    }
  };
  c.prototype.set = function(a, c) {
    var b = d(this, a);
    b.list || (b.list = this.data_[b.id] = []);
    b.entry ? b.entry.value = c : (b.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = d(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = h();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!d(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = d(this, a).entry) && a.value;
  };
  c.prototype.entries = function() {
    return g(this, function(a) {
      return [a.key, a.value];
    });
  };
  c.prototype.keys = function() {
    return g(this, function(a) {
      return a.key;
    });
  };
  c.prototype.values = function() {
    return g(this, function(a) {
      return a.value;
    });
  };
  c.prototype.forEach = function(a, c) {
    for (var b = this.entries(), f; !(f = b.next()).done;) {
      f = f.value, a.call(c, f[1], f[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var d = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? e.has(c) ? b = e.get(c) : (b = "" + ++l, e.set(c, b)) : b = "p_" + c;
    var d = a.data_[b];
    if (d && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < d.length; a++) {
        var f = d[a];
        if (c !== c && f.key !== f.key || c === f.key) {
          return {id:b, list:d, index:a, entry:f};
        }
      }
    }
    return {id:b, list:d, index:-1, entry:void 0};
  }, g = function(a, c) {
    var b = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (b) {
        for (; b.head != a.head_;) {
          b = b.previous;
        }
        for (; b.next != b.head;) {
          return b = b.next, {done:!1, value:c(b)};
        }
        b = null;
      }
      return {done:!0, value:void 0};
    });
  }, h = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, l = 0;
  return c;
}, "es6", "es3");
module.exports = function() {
  return "function" === typeof Map.prototype.entries;
};

