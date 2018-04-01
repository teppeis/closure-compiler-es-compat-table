// syntax / object literal extensions / computed accessors
module.exports = function() {
var x = 'y',
            valueSet,
            obj = {
              get [x] () { return 1 },
              set [x] (value) { valueSet = value }
            };
        obj.y = 'foo';
        return obj.y === 1 && valueSet === 'foo';
      
};