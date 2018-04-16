// misc / Object static methods accept primitives / Object.getPrototypeOf
module.exports = () => {
  return Object.getPrototypeOf('a').constructor === String;

};