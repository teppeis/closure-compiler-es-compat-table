// 2017 features / shared memory and atomics / Atomics.load
module.exports = () => {
  return typeof Atomics.load == 'function';

};