// 2016 misc / strict fn w/ non-strict non-simple params is error
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  function foo(...a){}
  try {
    Function("function bar(...a){'use strict';}")();
  } catch(e) {
    return true;
  }

};