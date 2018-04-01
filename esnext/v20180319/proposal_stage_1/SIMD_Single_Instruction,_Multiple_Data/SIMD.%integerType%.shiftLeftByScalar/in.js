// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%integerType%.shiftLeftByScalar
module.exports = function() {
return simdIntTypes.every(function(type){
          return typeof SIMD[type].shiftLeftByScalar === 'function';
        });
      
};