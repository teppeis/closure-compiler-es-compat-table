// proposal (stage 1) / Promise.try / returns instance of Promise
module.exports = () => {
  return Promise.try(function () {}) instanceof Promise;

};