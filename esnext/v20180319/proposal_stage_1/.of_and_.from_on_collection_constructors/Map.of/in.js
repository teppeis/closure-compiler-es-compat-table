// proposal (stage 1) / `.of` and `.from` on collection constructors / Map.of
module.exports = function() {
var A = {};
        var B = {};
        var C = Map.of([A, 1], [B, 2]);
        return C.get(A) + C.get(B) === 3;
      
};