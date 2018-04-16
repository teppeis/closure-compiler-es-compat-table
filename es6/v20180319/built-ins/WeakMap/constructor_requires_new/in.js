// built-ins / WeakMap / constructor requires new
module.exports = () => {
  new WeakMap();
  try {
    WeakMap();
    return false;
  } catch(e) {
    return true;
  }

};