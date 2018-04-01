module.exports = function() {
  try {
    eval("for (var i = 0 in {}) {}");
  } catch (a) {
    return !0;
  }
};

