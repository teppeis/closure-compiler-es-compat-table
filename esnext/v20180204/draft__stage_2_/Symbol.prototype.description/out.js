module.exports = function() {
  return "foo" === Symbol("foo").description;
};

