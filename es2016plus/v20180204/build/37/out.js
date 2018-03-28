module.exports = function() {
  return SharedArrayBuffer[Symbol.species] === SharedArrayBuffer;
};

