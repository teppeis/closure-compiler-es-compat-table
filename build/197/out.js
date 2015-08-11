module.exports = function() {
  for (var b = "Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = Object.getPrototypeOf(Int8Array), d = Object.getPrototypeOf(Int8Array.prototype), a = 0;a < b.length;a += 1) {
    if (!(b[a] in global && Object.getPrototypeOf(global[b[a]]) === c && Object.getPrototypeOf(global[b[a]].prototype) === d && "BYTES_PER_ELEMENT,constructor" === Object.getOwnPropertyNames(global[b[a]].prototype).sort() + "")) {
      return !1;
    }
  }
  return !0;
};

