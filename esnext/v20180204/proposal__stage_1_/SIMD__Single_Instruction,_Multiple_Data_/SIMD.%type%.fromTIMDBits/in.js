// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.fromTIMDBits
module.exports = function() {
  return ['Float32x4','Int32x4','Int8x16','Uint32x4','Uint16x8','Uint8x16'].every(function(type){
    return typeof SIMD.Int16x8['from' + type + 'Bits'] === 'function';
  });

};