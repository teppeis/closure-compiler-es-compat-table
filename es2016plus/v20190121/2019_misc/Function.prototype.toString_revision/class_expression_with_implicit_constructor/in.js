// 2019 misc / Function.prototype.toString revision / class expression with implicit constructor
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = 'class A {}';
  return eval('(' + str + ')') + '' === str;

};