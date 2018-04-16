// built-ins / Proxy / no "prototype" property
module.exports = () => {
  new Proxy({}, {});
  return !Proxy.hasOwnProperty('prototype');

};