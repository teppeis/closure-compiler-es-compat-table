// 2017 features / shared memory and atomics / SharedArrayBuffer.prototype.slice
module.exports = () => {
  return typeof SharedArrayBuffer.prototype.slice === 'function';

};