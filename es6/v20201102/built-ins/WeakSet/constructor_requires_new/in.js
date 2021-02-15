// built-ins / WeakSet / constructor requires new
module.exports = () => {
  new WeakSet();
  try {
    WeakSet();
    return false;
  } catch(e) {
    return true;
  }

};