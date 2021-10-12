module.exports = function() {
  return function() {
    return !Object.getOwnPropertyDescriptor(arguments, "caller");
  }();
};

