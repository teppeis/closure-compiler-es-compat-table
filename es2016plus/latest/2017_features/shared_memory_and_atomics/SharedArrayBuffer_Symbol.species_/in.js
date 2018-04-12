// 2017 features / shared memory and atomics / SharedArrayBuffer[Symbol.species]
module.exports = function() {
  return SharedArrayBuffer[Symbol.species] === SharedArrayBuffer;

};