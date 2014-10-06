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
  a.base = function(a, c, e) {
    var d = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, d);
  };
};
module.exports = function() {
  var a = new ArrayBuffer(64), a = new DataView(a), b = !0;
  a.setInt8(0, 128);
  b &= -128 === a.getInt8(0);
  a.setUint8(0, 256);
  b &= 0 === a.getUint8(0);
  a.setInt16(0, 32768);
  b &= -32768 === a.getInt16(0);
  a.setUint16(0, 65536);
  b &= 0 === a.getUint16(0);
  a.setInt32(0, 2147483648);
  b &= -2147483648 === a.getInt32(0);
  a.setUint32(0, 4294967296);
  b &= 0 === a.getUint32(0);
  a.setFloat32(0, .1);
  b &= .10000000149011612 === a.getFloat32(0);
  a.setFloat64(0, .1);
  return b &= .1 === a.getFloat64(0);
};

