module.exports = function() {
  function foo(...a) {}
  function bar(...a) {
    'use strict';
  }
  return false;
};
