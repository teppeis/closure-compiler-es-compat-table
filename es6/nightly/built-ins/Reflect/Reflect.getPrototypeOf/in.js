// built-ins / Reflect / Reflect.getPrototypeOf
module.exports = () => {
  return Reflect.getPrototypeOf([]) === Array.prototype;

};