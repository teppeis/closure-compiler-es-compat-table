// built-in extensions / Number properties / Number.parseInt
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var actualGlobal = Function('return this')();
  return typeof Number.parseInt === 'function'
&& Number.parseInt === actualGlobal.parseInt;

};