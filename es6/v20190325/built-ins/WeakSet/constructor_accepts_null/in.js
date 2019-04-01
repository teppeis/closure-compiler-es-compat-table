// built-ins / WeakSet / constructor accepts null
module.exports = () => {
  new WeakSet(null);
  return true;

};