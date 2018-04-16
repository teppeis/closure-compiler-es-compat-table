// 2016 misc / strict fn w/ non-strict non-simple params is error
module.exports = () => {
  function foo(...a) {}
  function bar(...a) {
    'use strict';
  }
  return false;
};
