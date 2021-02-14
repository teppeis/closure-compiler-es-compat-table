module.exports = function() {
  return "function" === typeof Atomics.isLockFree;
};

