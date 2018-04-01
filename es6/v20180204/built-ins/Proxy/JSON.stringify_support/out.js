module.exports = function() {
  return '["foo"]' === JSON.stringify(new Proxy(["foo"], {}));
};

