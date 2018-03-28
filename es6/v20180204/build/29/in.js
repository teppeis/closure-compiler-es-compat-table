// object literal extensions: computed properties
module.exports = function() {
var x = 'y';
        return ({ [x]: 1 }).y === 1;
      
};