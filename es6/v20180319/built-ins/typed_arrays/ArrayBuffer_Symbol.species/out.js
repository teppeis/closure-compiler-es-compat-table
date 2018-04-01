module.exports = function() {
  return "function" === typeof ArrayBuffer[Symbol.species];
};

