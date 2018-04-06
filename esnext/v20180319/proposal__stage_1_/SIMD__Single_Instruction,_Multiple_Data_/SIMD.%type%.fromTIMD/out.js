module.exports = function() {
  return "function" === typeof SIMD.Float32x4.fromInt32x4 && "function" === typeof SIMD.Float32x4.fromUint32x4 && "function" === typeof SIMD.Int32x4.fromFloat32x4 && "function" === typeof SIMD.Uint32x4.fromFloat32x4;
};

