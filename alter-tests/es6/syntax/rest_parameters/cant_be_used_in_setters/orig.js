// syntax / rest parameters / can't be used in setters
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  return (function (...args) {
    try {
      eval("({set e(...args){}})");
    } catch(e) {
      return true;
    }
  }());

};