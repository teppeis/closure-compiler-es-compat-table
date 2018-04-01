module.exports = function() {
  new Proxy({}, {});
  return !Proxy.hasOwnProperty("prototype");
};

