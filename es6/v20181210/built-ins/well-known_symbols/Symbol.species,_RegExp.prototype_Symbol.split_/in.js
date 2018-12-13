// built-ins / well-known symbols / Symbol.species, RegExp.prototype[Symbol.split]
module.exports = () => {
  var passed = false;
  var obj = { constructor: {} };
  obj[Symbol.split] = RegExp.prototype[Symbol.split];
  obj.constructor[Symbol.species] = function() {
    passed = true;
    return /./;
  };
  "".split(obj);
  return passed;

};