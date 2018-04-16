// built-ins / WeakMap / constructor accepts null
module.exports = () => {
  new WeakMap(null);
  return true;

};