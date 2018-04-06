// 2017 features / shared memory and atomics / Atomics.wake
module.exports = function() {
  return typeof Atomics.wake == 'function';

};