// built-in extensions / Object static methods / Object.setPrototypeOf
module.exports = () => {
  return Object.setPrototypeOf({}, Array.prototype) instanceof Array;

};