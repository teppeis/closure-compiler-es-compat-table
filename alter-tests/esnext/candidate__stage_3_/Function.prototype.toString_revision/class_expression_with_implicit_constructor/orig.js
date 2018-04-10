// candidate (stage 3) / Function.prototype.toString revision / class expression with implicit constructor
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = 'class A {}';
  return eval('(' + str + ')') + '' === str;

};