module.exports = function() {
  try {
    Function("function bar(...a){'use strict';}")();
  } catch (a) {
    return !0;
  }
};

