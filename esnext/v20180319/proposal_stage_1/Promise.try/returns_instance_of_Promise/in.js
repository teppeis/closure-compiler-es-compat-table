// proposal (stage 1) / Promise.try / returns instance of Promise
module.exports = function() {
  return Promise.try(function() {}) instanceof Promise;
};
