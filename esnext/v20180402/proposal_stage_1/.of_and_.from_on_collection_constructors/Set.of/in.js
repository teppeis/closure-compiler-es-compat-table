// proposal (stage 1) / `.of` and `.from` on collection constructors / Set.of
module.exports = function() {
  var A = {};
  var B = {};
  var C = Set.of(A, B);
  return C.has(A) + C.has(B);
};
