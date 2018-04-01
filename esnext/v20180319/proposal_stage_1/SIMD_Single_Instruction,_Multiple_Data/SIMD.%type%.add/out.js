module.exports = function() {
  return simdFloatIntTypes.every(function(a) {
    return "function" === typeof SIMD[a].add;
  });
};

