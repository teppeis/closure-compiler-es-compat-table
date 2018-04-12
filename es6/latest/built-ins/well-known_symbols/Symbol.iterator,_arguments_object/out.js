module.exports = function() {
  return function() {
    return "function" === typeof arguments[Symbol.iterator] && Object.hasOwnProperty.call(arguments, Symbol.iterator);
  }();
};

