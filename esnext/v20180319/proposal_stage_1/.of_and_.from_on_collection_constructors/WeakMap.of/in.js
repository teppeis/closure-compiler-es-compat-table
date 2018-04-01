// proposal (stage 1) / `.of` and `.from` on collection constructors / WeakMap.of
module.exports = function() {
  var A = {};
  var B = {};
  var C = WeakMap.of([A, 1], [B, 2]);
  return C.get(A) + C.get(B) === 3;
};
