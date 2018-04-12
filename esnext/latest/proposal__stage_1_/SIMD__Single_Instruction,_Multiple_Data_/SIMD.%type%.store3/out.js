module.exports = function() {
  return simd32bitFloatIntTypes.every(function(a) {
    return "function" === typeof SIMD[a].store3;
  });
};

