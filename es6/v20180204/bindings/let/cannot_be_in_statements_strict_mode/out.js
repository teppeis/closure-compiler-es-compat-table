module.exports = function() {
  try {
    Function("'use strict'; if(true) let baz = 1;")();
  } catch (a) {
    return !0;
  }
};

