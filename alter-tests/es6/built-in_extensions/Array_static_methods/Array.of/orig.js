// built-in extensions / Array static methods / Array.of
module.exports = () => {
  return typeof Array.of === 'function' &&
Array.of(2)[0] === 2;

};