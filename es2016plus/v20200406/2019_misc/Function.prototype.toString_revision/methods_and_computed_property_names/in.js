// 2019 misc / Function.prototype.toString revision / methods and computed property names
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = '[ /\x2A a \x2A/ "f" /\x2A b \x2A/ ] /\x2A c \x2A/ ( /\x2A d \x2A/ ) /\x2A e \x2A/ { /\x2A f \x2A/ }';
  return eval('({ /\x2A before \x2A/' + str + '/\x2A after \x2A/ }.f)') + '' === str;

};