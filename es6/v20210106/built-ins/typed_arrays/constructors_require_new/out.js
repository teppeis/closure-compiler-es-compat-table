module.exports = function() {
  var b = new ArrayBuffer(64);
  return "ArrayBuffer DataView Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" ").every(function(a) {
    try {
      if (a in global) {
        global[a]("ArrayBuffer" === a ? 64 : b);
      }
      return !1;
    } catch (c) {
      return !0;
    }
  });
};

