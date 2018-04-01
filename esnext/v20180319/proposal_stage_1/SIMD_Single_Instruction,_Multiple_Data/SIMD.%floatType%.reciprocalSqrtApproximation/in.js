// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%floatType%.reciprocalSqrtApproximation
module.exports = function() {
return simdFloatTypes.every(function(type){
          return typeof SIMD[type].reciprocalSqrtApproximation === 'function';
        });
      
};