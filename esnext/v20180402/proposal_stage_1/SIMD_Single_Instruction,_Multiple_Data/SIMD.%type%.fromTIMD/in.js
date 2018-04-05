// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.fromTIMD
module.exports = function() {
  return (
    typeof SIMD.Float32x4.fromInt32x4 === "function" &&
    typeof SIMD.Float32x4.fromUint32x4 === "function" &&
    typeof SIMD.Int32x4.fromFloat32x4 === "function" &&
    typeof SIMD.Uint32x4.fromFloat32x4 === "function"
  );
};
