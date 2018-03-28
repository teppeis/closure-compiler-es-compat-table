// WeakSet: .has and .delete methods accept primitives
module.exports = function() {
var s = new WeakSet;
        return s.has(1) === false
          && s.delete(1) === false;
      
};