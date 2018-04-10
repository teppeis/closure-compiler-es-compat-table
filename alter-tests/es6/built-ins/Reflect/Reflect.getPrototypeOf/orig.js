// built-ins / Reflect / Reflect.getPrototypeOf
module.exports = function() {
  return Reflect.getPrototypeOf([]) === Array.prototype;

};