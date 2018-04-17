var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
  a != Array.prototype && a != Object.prototype && (a[c] = b.value);
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
  return function(c) {
    return $jscomp.SYMBOL_PREFIX + (c || "") + a++;
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
  var c = 0;
  return $jscomp.iteratorPrototype(function() {
    return c < a.length ? {done:!1, value:a[c++]} : {done:!0};
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
  var c = a[Symbol.iterator];
  return c ? c.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.owns = function(a, c) {
  return Object.prototype.hasOwnProperty.call(a, c);
};
$jscomp.polyfill = function(a, c, b, e) {
  if (c) {
    b = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var g = a[e];
      g in b || (b[g] = {});
      b = b[g];
    }
    a = a[a.length - 1];
    e = b[a];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:c});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function c(a) {
    $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value:{}});
  }
  function b(a) {
    var d = Object[a];
    d && (Object[a] = function(a) {
      c(a);
      return d(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), d = Object.seal({}), c = new a([[b, 2], [d, 3]]);
      if (2 != c.get(b) || 3 != c.get(d)) {
        return !1;
      }
      c.delete(b);
      c.set(d, 4);
      return !c.has(b) && 4 == c.get(d);
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
  var g = 0, f = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  f.prototype.set = function(a, d) {
    c(a);
    if (!$jscomp.owns(a, e)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[e][this.id_] = d;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, e) ? a[e][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1;
  };
  return f;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(a) {
  if (!$jscomp.ASSUME_NO_NATIVE_MAP && function() {
    if (!a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var d = Object.seal({x:4}), b = new a($jscomp.makeIterator([[d, "s"]]));
      if ("s" != b.get(d) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var c = b.entries(), e = c.next();
      if (e.done || e.value[0] != d || "s" != e.value[1]) {
        return !1;
      }
      e = c.next();
      return e.done || 4 != e.value[0].x || "t" != e.value[1] || !c.next().done ? !1 : !0;
    } catch (l) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = new WeakMap, b = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var d; !(d = a.next()).done;) {
        d = d.value, this.set(d[0], d[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    var d = e(this, a);
    d.list || (d.list = this.data_[d.id] = []);
    d.entry ? d.entry.value = b : (d.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, d.list.push(d.entry), this.head_.previous.next = d.entry, this.head_.previous = d.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = e(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
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
    var d = b && typeof b;
    "object" == d || "function" == d ? c.has(b) ? d = c.get(b) : (d = "" + ++h, c.set(b, d)) : d = "p_" + b;
    var e = a.data_[d];
    if (e && $jscomp.owns(a.data_, d)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (b !== b && f.key !== f.key || b === f.key) {
          return {id:d, list:e, index:a, entry:f};
        }
      }
    }
    return {id:d, list:e, index:-1, entry:void 0};
  }, g = function(a, b) {
    var d = a.head_;
    return $jscomp.iteratorPrototype(function() {
      if (d) {
        for (; d.head != a.head_;) {
          d = d.previous;
        }
        for (; d.next != d.head;) {
          return d = d.next, {done:!1, value:b(d)};
        }
        d = null;
      }
      return {done:!0, value:void 0};
    });
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, h = 0;
  return b;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  if (!$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({x:4}), c = new a($jscomp.makeIterator([b]));
      if (!c.has(b) || 1 != c.size || c.add(b) != c || 1 != c.size || c.add({x:4}) != c || 2 != c.size) {
        return !1;
      }
      var g = c.entries(), f = g.next();
      if (f.done || f.value[0] != b || f.value[1] != b) {
        return !1;
      }
      f = g.next();
      return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : g.next().done;
    } catch (h) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var c = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  c.prototype.add = function(a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  c.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  c.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return this.map_.has(a);
  };
  c.prototype.entries = function() {
    return this.map_.entries();
  };
  c.prototype.values = function() {
    return this.map_.values();
  };
  c.prototype.keys = c.prototype.values;
  c.prototype[Symbol.iterator] = c.prototype.values;
  c.prototype.forEach = function(a, c) {
    var b = this;
    this.map_.forEach(function(e) {
      return a.call(c, e, e, b);
    });
  };
  return c;
}, "es6", "es3");
module.exports = function() {
  var a = new Set;
  a.add(-0);
  var c;
  a.forEach(function(a) {
    c = 1 / a;
  });
  return Infinity === c && a.has(0);
};

