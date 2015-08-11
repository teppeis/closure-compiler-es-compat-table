module.exports = function() {
  for (var c = new ArrayBuffer(64), b = "ArrayBuffer DataView Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), a = 0;a < b.length;a += 1) {
    try {
      if (b[a] in global) {
        global[b[a]]("ArrayBuffer" === b[a] ? 64 : c);
      }
      return !1;
    } catch (d) {
    }
  }
  return !0;
};

