// proposal (stage 1) / `.of` and `.from` on collection constructors / WeakSet.from
module.exports = () => {
  var A = {};
  var B = {};
  var C = WeakSet.from([A, B]);
  return C.has(A) + C.has(B);

};