// candidate (stage 3) / Function.prototype.toString revision / class expression with explicit constructor
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = 'class /\x2A a \x2A/ A /\x2A b \x2A/ extends /\x2A c \x2A/ function B(){} /\x2A d \x2A/ { /\x2A e \x2A/ constructor /\x2A f \x2A/ ( /\x2A g \x2A/ ) /\x2A h \x2A/ { /\x2A i \x2A/ ; /\x2A j \x2A/ } /\x2A k \x2A/ m /\x2A l \x2A/ ( /\x2A m \x2A/ ) /\x2A n \x2A/ { /\x2A o \x2A/ } /\x2A p \x2A/ }';
  return eval('(/\x2A before \x2A/' + str + '/\x2A after \x2A/)') + '' === str;

};