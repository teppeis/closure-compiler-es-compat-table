// built-ins / Reflect / Reflect.isExtensible
module.exports = function() {
  return Reflect.isExtensible({}) &&
!Reflect.isExtensible(Object.preventExtensions({}));

};