var $jscomp = {scope:{}}, $jscomp = $jscomp || {};
$jscomp.IteratorResult = function() {
};
$jscomp.Iterator = function() {
};
$jscomp.Iterable = function() {
};
$jscomp.Iterable.prototype.$$iterator = function() {
};
$jscomp.makeIterator = function(b) {
  if (b.$$iterator) {
    return b.$$iterator();
  }
  if (!(b instanceof Array)) {
    throw Error();
  }
  var a = 0;
  return{next:function() {
    return a == b.length ? {done:!0} : {done:!1, value:b[a++]};
  }};
};
$jscomp.copyProperties = function(b, a) {
  for (var c in a) {
    b[c] = a[c];
  }
};
$jscomp.inherits = function(b, a) {
  function c() {
  }
  c.prototype = a.prototype;
  b.superClass_ = a.prototype;
  b.prototype = new c;
  b.prototype.constructor = b;
  b.base = function(b, c, e) {
    var d = Array.prototype.slice.call(arguments, 2);
    return a.prototype[c].apply(b, d);
  };
};
module.exports = function() {
  var b = function() {
    function b(c, d) {
      for (;;) {
        switch(a) {
          case 0:
            return a = 1, {value:5, done:!1};
          case 1:
            if (void 0 === d) {
              a = 2;
              break;
            }
            a = -1;
            throw d;;
          case 2:
            return a = 3, {value:6, done:!1};
          case 3:
            if (void 0 === d) {
              a = 4;
              break;
            }
            a = -1;
            throw d;;
          case 4:
            a = -1;
          default:
            return{value:void 0, done:!0};
        }
      }
    }
    var a = 0;
    return{$$iterator:function() {
      return this;
    }, next:function(a) {
      return b(a, void 0);
    }, "throw":function(a) {
      return b(void 0, a);
    }};
  }(), a = b.next(), c = 5 === a.value && !1 === a.done, a = b.next(), c = c & (6 === a.value && !1 === a.done), a = b.next();
  return c &= void 0 === a.value && !0 === a.done;
};

