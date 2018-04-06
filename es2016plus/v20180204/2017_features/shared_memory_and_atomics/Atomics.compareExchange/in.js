// 2017 features / shared memory and atomics / Atomics.compareExchange
module.exports = function() {
  return typeof Atomics.compareExchange == 'function';

};