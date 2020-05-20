// 2017 features / shared memory and atomics / Atomics.isLockFree
module.exports = () => {
  return typeof Atomics.isLockFree === 'function';

};