// built-ins / well-known symbols / Symbol.species, Array.prototype.map
module.exports = function() {
var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.map.call(obj, Boolean).foo === 1;
      
};