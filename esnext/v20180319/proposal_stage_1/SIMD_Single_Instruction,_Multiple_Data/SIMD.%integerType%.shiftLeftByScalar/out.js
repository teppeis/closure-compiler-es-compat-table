module.exports = function() {
  return simdIntTypes.every(function(a) {
    return "function" === typeof SIMD[a].shiftLeftByScalar;
  });
};

