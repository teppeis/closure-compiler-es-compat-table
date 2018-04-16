// built-ins / Reflect / Reflect.setPrototypeOf
module.exports = () => {
  var obj = {};
  Reflect.setPrototypeOf(obj, Array.prototype);
  return obj instanceof Array;

};