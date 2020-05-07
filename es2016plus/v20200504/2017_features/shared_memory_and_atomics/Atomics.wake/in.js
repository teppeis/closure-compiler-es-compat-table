// 2017 features / shared memory and atomics / Atomics.wake
module.exports = () => {
  return typeof Atomics.wake === 'function';

};