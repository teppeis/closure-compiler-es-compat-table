module.exports = function() {
  try {
    Function("'use strict'; if(true) const baz = 1;")();
  } catch (a) {
    return !0;
  }
};

