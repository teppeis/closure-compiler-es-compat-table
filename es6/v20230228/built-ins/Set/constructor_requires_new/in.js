// built-ins / Set / constructor requires new
module.exports = () => {
  new Set();
  try {
    Set();
    return false;
  } catch(e) {
    return true;
  }

};