// 2017 features / shared memory and atomics / SharedArrayBuffer.prototype[Symbol.toStringTag]
module.exports = () => {
  return SharedArrayBuffer.prototype[Symbol.toStringTag] === 'SharedArrayBuffer';

};