// built-in extensions / Number properties / Number.parseFloat
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  var actualGlobal = Function('return this')();
  return typeof Number.parseFloat === 'function'
&& Number.parseFloat === actualGlobal.parseFloat;

};