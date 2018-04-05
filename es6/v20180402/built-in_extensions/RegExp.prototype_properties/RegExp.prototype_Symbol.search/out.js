module.exports = function() {
  return "function" === typeof RegExp.prototype[Symbol.search];
};

