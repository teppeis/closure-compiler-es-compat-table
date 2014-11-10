// Promise
module.exports = function () {
    return typeof Promise !== 'undefined' &&
           typeof Promise.all === 'function';
  }