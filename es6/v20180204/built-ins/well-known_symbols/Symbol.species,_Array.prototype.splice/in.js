// built-ins / well-known symbols / Symbol.species, Array.prototype.splice
module.exports = function() {
  var obj = [];
  obj.constructor = {};
  obj.constructor[Symbol.species] = function() {
    return { foo: 1 };
  };
  return Array.prototype.splice.call(obj, 0).foo === 1;

};