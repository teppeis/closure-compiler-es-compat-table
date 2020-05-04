module.exports = function() {
  __lookupGetter__.call(1, "key");
  try {
    __lookupGetter__.call(null, "key");
  } catch (a) {
    return !0;
  }
};

