// 2017 features / shared memory and atomics / SharedArrayBuffer.prototype.byteLength
module.exports = () => {
  return 'byteLength' in SharedArrayBuffer.prototype;

};