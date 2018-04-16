// candidate (stage 3) / Function.prototype.toString revision / arrows
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = 'a => b';
  return eval('(' + str + ')') + '' === str;

};