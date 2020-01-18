// built-ins / Reflect / Reflect.isExtensible
module.exports = () => {
  return Reflect.isExtensible({}) &&
!Reflect.isExtensible(Object.preventExtensions({}));

};