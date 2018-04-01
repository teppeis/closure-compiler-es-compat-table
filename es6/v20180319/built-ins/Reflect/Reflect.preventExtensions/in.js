// built-ins / Reflect / Reflect.preventExtensions
module.exports = function() {
  var obj = {};
  Reflect.preventExtensions(obj);
  return !Object.isExtensible(obj);
};
