// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%booleanType%.anyTrue
module.exports = function() {
return simdBoolTypes.every(function(type){
          return typeof SIMD[type].anyTrue === 'function';
        });
      
};