// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.store2
module.exports = function() {
return simd32bitFloatIntTypes.every(function(type){
          return typeof SIMD[type].store2 === 'function';
        });
      
};