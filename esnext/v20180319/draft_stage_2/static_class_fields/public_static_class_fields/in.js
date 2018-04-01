// draft (stage 2) / static class fields / public static class fields
module.exports = function() {
class C {
          static x = 'x';
        }
        return C.x === 'x';
      
};