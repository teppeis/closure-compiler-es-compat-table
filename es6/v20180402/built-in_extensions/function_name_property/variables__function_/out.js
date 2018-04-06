module.exports = function() {
  return "foo" === function() {
  }.name && "baz" === function() {
  }.name;
};

