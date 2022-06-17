module.exports = function() {
  return -1 < Object.getOwnPropertyNames(Object.prototype).indexOf("__proto__");
};

