// 2017 features / shared memory and atomics / Atomics.wait
module.exports = () => {
  return typeof Atomics.wait === 'function';

};