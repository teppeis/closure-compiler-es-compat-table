module.exports = function() {
  return "Float32x4 Int32x4 Int8x16 Uint32x4 Uint16x8 Uint8x16".split(" ").every(function(a) {
    return "function" === typeof SIMD.Int16x8["from" + a + "Bits"];
  });
};

