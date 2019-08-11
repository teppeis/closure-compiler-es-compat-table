// built-ins / Proxy / constructor requires new
module.exports = () => {
  new Proxy({}, {});
  try {
    Proxy({}, {});
    return false;
  } catch(e) {
    return true;
  }

};