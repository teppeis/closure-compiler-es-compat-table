// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.and
module.exports = function() {
  return simdBoolIntTypes.every(function(type){
    return typeof SIMD[type].and === 'function';
  });

};