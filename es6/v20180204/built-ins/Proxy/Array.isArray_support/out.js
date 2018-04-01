module.exports = function() {
  return Array.isArray(new Proxy([], {}));
};

