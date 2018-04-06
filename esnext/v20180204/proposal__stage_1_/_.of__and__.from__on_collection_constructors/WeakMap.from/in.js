// proposal (stage 1) / `.of` and `.from` on collection constructors / WeakMap.from
module.exports = function() {
  var A = {};
  var B = {};
  var C = WeakMap.from([[A, 1], [B, 2]], function (it) {
    return [it[0], it[1] + 1];
  });
  return C.get(A) + C.get(B) === 5;

};