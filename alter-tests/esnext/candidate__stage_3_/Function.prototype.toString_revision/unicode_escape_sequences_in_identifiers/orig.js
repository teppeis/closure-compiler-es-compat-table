// candidate (stage 3) / Function.prototype.toString revision / unicode escape sequences in identifiers
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var str = 'function \\u0061(\\u{62}, \\u0063) { \\u0062 = \\u{00063}; return b; }';
  return eval('(/\x2A before \x2A/' + str + '/\x2A after \x2A/)') + '' === str;

};