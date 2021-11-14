// 2018 misc / Proxy "ownKeys" handler, duplicate keys for non-extensible targets
module.exports = () => {
  var p = new Proxy({}, {
    ownKeys() {
      return ["a", "a"];
    }
  });
  try {
    Object.keys(p);
  } catch (e) {
    return e instanceof TypeError
  }
  return false;

};