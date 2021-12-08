// misc / Object static methods accept primitives / Object.preventExtensions
module.exports = () => {
  return Object.preventExtensions('a') === 'a';

};