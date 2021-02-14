// 2017 features / shared memory and atomics / Atomics.compareExchange
module.exports = () => {
  return typeof Atomics.compareExchange === 'function';

};