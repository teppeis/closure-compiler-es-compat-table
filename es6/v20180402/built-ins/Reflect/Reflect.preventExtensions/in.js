// built-ins / Reflect / Reflect.preventExtensions
module.exports = () => {
  var obj = {};
  Reflect.preventExtensions(obj);
  return !Object.isExtensible(obj);

};