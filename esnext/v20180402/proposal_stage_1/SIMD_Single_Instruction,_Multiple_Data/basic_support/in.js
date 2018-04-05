// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / basic support
module.exports = function() {
  simdFloatTypes = ["Float32x4"];
  simdBoolTypes = ["Bool32x4", "Bool16x8", "Bool8x16"];
  simdIntTypes = [
    "Int32x4",
    "Int16x8",
    "Int8x16",
    "Uint32x4",
    "Uint16x8",
    "Uint8x16"
  ];
  simd32bitFloatIntTypes = ["Float32x4", "Int32x4", "Uint32x4"];
  simdSmallIntTypes = ["Int16x8", "Int8x16", "Uint16x8", "Uint8x16"];
  simdBoolIntTypes = simdBoolTypes.concat(simdIntTypes);
  simdFloatIntTypes = simdFloatTypes.concat(simdIntTypes);
  simdAllTypes = simdFloatTypes.concat(simdIntTypes, simdBoolTypes);
  return typeof SIMD !== "undefined";
};
