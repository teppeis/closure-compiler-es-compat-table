// well-known symbols: Symbol.species, Array.prototype.concat
module.exports = function() {
var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.concat.call(obj, []).foo === 1;
      
};