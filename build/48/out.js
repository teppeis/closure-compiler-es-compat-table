var $jscomp = {scope:{}}, $jscomp = $jscomp || {};
$jscomp.IteratorResult = function() {
};
$jscomp.Iterator = function() {
};
$jscomp.Iterable = function() {
};
$jscomp.Iterable.prototype.$$iterator = function() {
};
$jscomp.makeIterator = function(a) {
  if (a.$$iterator) {
    return a.$$iterator();
  }
  if (!(a instanceof Array)) {
    throw Error();
  }
  var b = 0;
  return{next:function() {
    return b == a.length ? {done:!0} : {done:!1, value:a[b++]};
  }};
};
$jscomp.copyProperties = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
$jscomp.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, g) {
    var e = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, e);
  };
};
module.exports = function() {
  var a = function() {
    function a(d, f) {
      for (;;) {
        switch(b) {
          case 0:
            e = $jscomp.makeIterator(function() {
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
            }());
          case 1:
            if ((c = e.next(d)).done) {
              b = 2;
              break;
            }
            b = 3;
            return{value:c.value, done:!1};
          case 3:
            if (void 0 === f) {
              b = 4;
              break;
            }
            b = -1;
            throw f;;
          case 4:
            b = 1;
            break;
          case 2:
            b = -1;
          default:
            return{value:void 0, done:!0};
        }
      }
    }
    var b = 0, c, e;
    return{$$iterator:function() {
      return this;
    }, next:function(b) {
      return a(b, void 0);
    }, "throw":function(b) {
      return a(void 0, b);
    }};
  }(), b = a.next(), c = 5 === b.value && !1 === b.done, b = a.next(), c = c & (6 === b.value && !1 === b.done), b = a.next();
  return c &= void 0 === b.value && !0 === b.done;
};

