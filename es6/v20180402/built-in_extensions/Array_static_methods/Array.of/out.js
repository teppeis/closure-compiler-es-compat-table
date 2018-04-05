module.exports = function() {
  return "function" === typeof Array.of && 2 === Array.of(2)[0];
};

