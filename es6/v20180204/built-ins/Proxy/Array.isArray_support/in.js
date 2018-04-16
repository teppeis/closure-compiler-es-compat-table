// built-ins / Proxy / Array.isArray support
module.exports = () => {
  return Array.isArray(new Proxy([], {}));

};