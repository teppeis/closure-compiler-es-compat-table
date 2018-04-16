// proposal (stage 1) / `.of` and `.from` on collection constructors / WeakSet.of
module.exports = () => {
  var A = {};
  var B = {};
  var C = WeakSet.of(A, B);
  return C.has(A) + C.has(B);

};