module.exports = function() {
  return "SharedArrayBuffer" === SharedArrayBuffer.prototype[Symbol.toStringTag];
};

