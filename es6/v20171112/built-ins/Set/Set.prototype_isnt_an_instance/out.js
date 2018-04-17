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
$jscomp.polyfill = function(a, d, b, c) {
  if (d) {
    b = $jscomp.global;
    a = a.split(".");
    for (c = 0; c < a.length - 1; c++) {
      var g = a[c];
      g in b || (b[g] = {});
      b = b[g];
    }
    a = a[a.length - 1];
    c = b[a];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(b, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d(a) {
    $jscomp.owns(a, c) || $jscomp.defineProperty(a, c, {value:{}});
  }
  function b(a) {
    var e = Object[a];
    e && (Object[a] = function(a) {
      d(a);
      return e(a);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var b = Object.seal({}), e = Object.seal({}), d = new a([[b, 2], [e, 3]]);
      if (2 != d.get(b) || 3 != d.get(e)) {
        return !1;
      }
      d.delete(b);
      d.set(e, 4);
      return !d.has(b) && 4 == d.get(e);
    } catch (k) {
      return !1;
    }
  }()) {
    return a;
  }
  var c = "$jscomp_hidden_" + Math.random().toString().substring(2);
  b("freeze");
  b("preventExtensions");
  b("seal");
  var g = 0, f = function(a) {
    this.id_ = (g += Math.random() + 1).toString();
    if (a) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      a = $jscomp.makeIterator(a);
      for (var e; !(e = a.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  f.prototype.set = function(a, e) {
    d(a);
    if (!$jscomp.owns(a, c)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[c][this.id_] = e;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, c) ? a[c][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, c) && $jscomp.owns(a[c], this.id_) ? delete a[c][this.id_] : !1;
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
      var e = Object.seal({x:4}), b = new a($jscomp.makeIterator([[e, "s"]]));
      if ("s" != b.get(e) || 1 != b.size || b.get({x:4}) || b.set({x:4}, "t") != b || 2 != b.size) {
        return !1;
      }
      var d = b.entries(), c = d.next();
      if (c.done || c.value[0] != e || "s" != c.value[1]) {
        return !1;
      }
      c = d.next();
      return c.done || 4 != c.value[0].x || "t" != c.value[1] || !d.next().done ? !1 : !0;
    } catch (l) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, b = function(a) {
    this.data_ = {};
    this.head_ = f();
    this.size = 0;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var e; !(e = a.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  };
  b.prototype.set = function(a, b) {
    var e = c(this, a);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = b : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:b}, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  b.prototype.delete = function(a) {
    a = c(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  b.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  b.prototype.has = function(a) {
    return !!c(this, a).entry;
  };
  b.prototype.get = function(a) {
    return (a = c(this, a).entry) && a.value;
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
    for (var e = this.entries(), d; !(d = e.next()).done;) {
      d = d.value, a.call(b, d[1], d[0], this);
    }
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  var c = function(a, b) {
    var c = b && typeof b;
    "object" == c || "function" == c ? d.has(b) ? c = d.get(b) : (c = "" + ++h, d.set(b, c)) : c = "p_" + b;
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
      var d = c.entries(), f = d.next();
      if (f.done || f.value[0] != b || f.value[1] != b) {
        return !1;
      }
      f = d.next();
      return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : d.next().done;
    } catch (h) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = function(a) {
    this.map_ = new Map;
    if (a) {
      a = $jscomp.makeIterator(a);
      for (var b; !(b = a.next()).done;) {
        this.add(b.value);
      }
    }
    this.size = this.map_.size;
  };
  d.prototype.add = function(a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this;
  };
  d.prototype.delete = function(a) {
    a = this.map_.delete(a);
    this.size = this.map_.size;
    return a;
  };
  d.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  d.prototype.has = function(a) {
    return this.map_.has(a);
  };
  d.prototype.entries = function() {
    return this.map_.entries();
  };
  d.prototype.values = function() {
    return this.map_.values();
  };
  d.prototype.keys = d.prototype.values;
  d.prototype[Symbol.iterator] = d.prototype.values;
  d.prototype.forEach = function(a, c) {
    var b = this;
    this.map_.forEach(function(d) {
      return a.call(c, d, d, b);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  new Set;
  var a = {};
  try {
    Set.prototype.has(a);
  } catch (d) {
    return !0;
  }
};

