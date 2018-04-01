// 2017 features / shared memory and atomics / Atomics.store
module.exports = function() {
  return typeof Atomics.store == "function";
};
