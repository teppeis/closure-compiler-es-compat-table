// 2017 features / shared memory and atomics / SharedArrayBuffer[Symbol.species]
module.exports = () => {
  return SharedArrayBuffer[Symbol.species] === SharedArrayBuffer;

};