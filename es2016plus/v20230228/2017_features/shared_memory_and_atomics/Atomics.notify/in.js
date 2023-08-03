// 2017 features / shared memory and atomics / Atomics.notify
module.exports = () => {
  return typeof Atomics.notify === 'function';

};