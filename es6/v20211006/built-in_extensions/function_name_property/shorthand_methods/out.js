module.exports = function() {
  return "foo" === function() {
  }.name;
};

