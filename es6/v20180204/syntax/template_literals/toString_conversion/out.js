module.exports = function() {
  return "foo" === "" + {toString:function() {
    return "foo";
  }, valueOf:function() {
    return "bar";
  }};
};

