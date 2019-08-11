module.exports = function() {
  return "foo" === function() {
  }.name && "" === function() {
  }.name;
};

