// 2017 features / shared memory and atomics / Atomics.load
module.exports = function() {
  return typeof Atomics.load == "function";
};
