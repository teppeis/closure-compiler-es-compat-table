// proposal (stage 1) / SIMD (Single Instruction, Multiple Data) / SIMD.%type%.load2
module.exports = () => {
  return simd32bitFloatIntTypes.every(function(type){
    return typeof SIMD[type].load2 === 'function';
  });

};