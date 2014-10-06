var $jscomp = {scope:{}}, $jscomp = $jscomp || {};
$jscomp.IteratorResult = function() {
};
$jscomp.Iterator = function() {
};
$jscomp.Iterable = function() {
};
$jscomp.Iterable.prototype.$$iterator = function() {
};
$jscomp.makeIterator = function(c) {
  if (c.$$iterator) {
    return c.$$iterator();
  }
  if (!(c instanceof Array)) {
    throw Error();
  }
  var b = 0;
  return{next:function() {
    return b == c.length ? {done:!0} : {done:!1, value:c[b++]};
  }};
};
$jscomp.copyProperties = function(c, b) {
  for (var a in b) {
    c[a] = b[a];
  }
};
$jscomp.inherits = function(c, b) {
  function a() {
  }
  a.prototype = b.prototype;
  c.superClass_ = b.prototype;
  c.prototype = new a;
  c.prototype.constructor = c;
  c.base = function(a, c, e) {
    var d = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, d);
  };
};
module.exports = function() {
  var c = new ArrayBuffer(64), b = !0, a;
  a = new Int8Array(c);
  a[0] = 128;
  b &= -128 === a[0];
  a = new Uint8Array(c);
  a[0] = 256;
  b &= 0 === a[0];
  a = new Uint8ClampedArray(c);
  a[0] = 256;
  b &= 255 === a[0];
  a = new Int16Array(c);
  a[0] = 32768;
  b &= -32768 === a[0];
  a = new Uint16Array(c);
  a[0] = 65536;
  b &= 0 === a[0];
  a = new Int32Array(c);
  a[0] = 2147483648;
  b &= -2147483648 === a[0];
  a = new Uint32Array(c);
  a[0] = 4294967296;
  b &= 0 === a[0];
  a = new Float32Array(c);
  a[0] = .1;
  b &= .10000000149011612 === a[0];
  a = new Float64Array(c);
  a[0] = .1;
  return b &= .1 === a[0];
};

