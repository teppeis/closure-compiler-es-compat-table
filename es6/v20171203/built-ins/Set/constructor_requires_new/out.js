var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, c) {
  a != Array.prototype && a != Object.prototype && (a[d] = c.value);
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
$jscomp.polyfill = function(a, d, c, b) {
  if (d) {
    c = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var g = a[b];
      g in c || (c[g] = {});
      c = c[g];
    }
    a = a[a.length - 1];
    b = c[a];
    d = d(b);
    d != b && null != d && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:d});
  }
};
$jscomp.polyfill("WeakMap", function(a) {
  function d(a) {
    $jscomp.owns(a, b) || $jscomp.defineProperty(a, b, {value:{}});
  }
  function c(a) {
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
      var c = Object.seal({}), e = Object.seal({}), b = new a([[c, 2], [e, 3]]);
      if (2 != b.get(c) || 3 != b.get(e)) {
        return !1;
      }
      b.delete(c);
      b.set(e, 4);
      return !b.has(c) && 4 == b.get(e);
    } catch (k) {
      return !1;
    }
  }()) {
    return a;
  }
  var b = "$jscomp_hidden_" + Math.random().toString().substring(2);
  c("freeze");
  c("preventExtensions");
  c("seal");
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
    if (!$jscomp.owns(a, b)) {
      throw Error("WeakMap key fail: " + a);
    }
    a[b][this.id_] = e;
    return this;
  };
  f.prototype.get = function(a) {
    return $jscomp.owns(a, b) ? a[b][this.id_] : void 0;
  };
  f.prototype.has = function(a) {
    return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_);
  };
  f.prototype.delete = function(a) {
    return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_) ? delete a[b][this.id_] : !1;
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
      var e = Object.seal({x:4}), c = new a($jscomp.makeIterator([[e, "s"]]));
      if ("s" != c.get(e) || 1 != c.size || c.get({x:4}) || c.set({x:4}, "t") != c || 2 != c.size) {
        return !1;
      }
      var b = c.entries(), d = b.next();
      if (d.done || d.value[0] != e || "s" != d.value[1]) {
        return !1;
      }
      d = b.next();
      return d.done || 4 != d.value[0].x || "t" != d.value[1] || !b.next().done ? !1 : !0;
    } catch (l) {
      return !1;
    }
  }()) {
    return a;
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var d = new WeakMap, c = function(a) {
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
  c.prototype.set = function(a, c) {
    var e = b(this, a);
    e.list || (e.list = this.data_[e.id] = []);
    e.entry ? e.entry.value = c : (e.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:a, value:c}, e.list.push(e.entry), this.head_.previous.next = e.entry, this.head_.previous = e.entry, this.size++);
    return this;
  };
  c.prototype.delete = function(a) {
    a = b(this, a);
    return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1;
  };
  c.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = f();
    this.size = 0;
  };
  c.prototype.has = function(a) {
    return !!b(this, a).entry;
  };
  c.prototype.get = function(a) {
    return (a = b(this, a).entry) && a.value;
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
    for (var e = this.entries(), b; !(b = e.next()).done;) {
      b = b.value, a.call(c, b[1], b[0], this);
    }
  };
  c.prototype[Symbol.iterator] = c.prototype.entries;
  var b = function(a, c) {
    var b = c && typeof c;
    "object" == b || "function" == b ? d.has(c) ? b = d.get(c) : (b = "" + ++h, d.set(c, b)) : b = "p_" + c;
    var e = a.data_[b];
    if (e && $jscomp.owns(a.data_, b)) {
      for (a = 0; a < e.length; a++) {
        var f = e[a];
        if (c !== c && f.key !== f.key || c === f.key) {
          return {id:b, list:e, index:a, entry:f};
        }
      }
    }
    return {id:b, list:e, index:-1, entry:void 0};
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
  }, f = function() {
    var a = {};
    return a.previous = a.next = a.head = a;
  }, h = 0;
  return c;
}, "es6", "es3");
$jscomp.polyfill("Set", function(a) {
  if (!$jscomp.ASSUME_NO_NATIVE_SET && function() {
    if (!a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var c = Object.seal({x:4}), b = new a($jscomp.makeIterator([c]));
      if (!b.has(c) || 1 != b.size || b.add(c) != b || 1 != b.size || b.add({x:4}) != b || 2 != b.size) {
        return !1;
      }
      var d = b.entries(), f = d.next();
      if (f.done || f.value[0] != c || f.value[1] != c) {
        return !1;
      }
      f = d.next();
      return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : d.next().done;
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
  d.prototype.forEach = function(a, b) {
    var c = this;
    this.map_.forEach(function(d) {
      return a.call(b, d, d, c);
    });
  };
  return d;
}, "es6", "es3");
module.exports = function() {
  new Set;
  try {
    return Set(), !1;
  } catch (a) {
    return !0;
  }
};

