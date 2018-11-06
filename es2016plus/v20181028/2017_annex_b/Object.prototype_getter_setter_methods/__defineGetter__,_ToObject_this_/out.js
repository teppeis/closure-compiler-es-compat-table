module.exports = function() {
  __defineGetter__.call(1, "__accessors_test__", function() {
  });
  try {
    __defineGetter__.call(null, "__accessors_test__", function() {
    });
  } catch (a) {
    return !0;
  }
};

