// 2017 features / shared memory and atomics / Atomics.exchange
module.exports = () => {
  return typeof Atomics.exchange == 'function';

};