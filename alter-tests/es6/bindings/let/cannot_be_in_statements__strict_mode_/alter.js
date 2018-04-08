module.exports = function() {
  'use strict';
  let bar = 1;
  if(true) let baz = 1;
  return false;
};

// EXPECT: 5: ERROR - Block-scoped declaration not directly within block: baz
