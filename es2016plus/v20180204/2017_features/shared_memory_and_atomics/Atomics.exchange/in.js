// 2017 features / shared memory and atomics / Atomics.exchange
module.exports = function() {
  return typeof Atomics.exchange == 'function';

};