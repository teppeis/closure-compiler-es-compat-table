module.exports = function() {
  $jscomp.initSymbolIterator();
  for (var c = "Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) {
    var a = new global[c[b]](__createIterableObject([1, 2, 3]));
    if (3 !== a.length || 1 !== a[0] || 2 !== a[1] || 3 !== a[2]) {
      return !1;
    }
  }
  return !0;
};

