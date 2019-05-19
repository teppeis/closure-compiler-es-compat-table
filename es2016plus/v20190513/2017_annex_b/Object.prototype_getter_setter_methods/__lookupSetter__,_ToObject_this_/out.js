module.exports = function() {
  __lookupSetter__.call(1, "key");
  try {
    __lookupSetter__.call(null, "key");
  } catch (a) {
    return !0;
  }
};

