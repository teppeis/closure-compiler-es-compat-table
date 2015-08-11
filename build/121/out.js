module.exports = function() {
  return !function() {
    return 5;
  }.hasOwnProperty("prototype");
};

