// Symbol.isRegExp
module.exports = function() {

    return RegExp.prototype[Symbol.isRegExp] === true;
  
};