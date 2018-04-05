// misc / Object static methods accept primitives / Object.isExtensible
module.exports = function() {
  return Object.isExtensible("a") === false;
};
