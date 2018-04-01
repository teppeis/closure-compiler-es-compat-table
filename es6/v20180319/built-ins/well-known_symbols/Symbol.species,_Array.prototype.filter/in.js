// built-ins / well-known symbols / Symbol.species, Array.prototype.filter
module.exports = function() {
var obj = [];
        obj.constructor = {};
        obj.constructor[Symbol.species] = function() {
            return { foo: 1 };
        };
        return Array.prototype.filter.call(obj, Boolean).foo === 1;
      
};