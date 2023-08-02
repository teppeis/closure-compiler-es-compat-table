module.exports = function() {
  return Object.getPrototypeOf("a").constructor === String;
};

