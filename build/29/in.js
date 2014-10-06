// Proxy
module.exports = function () {
    try {
      return typeof Proxy !== "undefined" &&
           new Proxy({}, { get: function () { return 5; } }).foo === 5;
    }
    catch(err) { }
    return false;
  }