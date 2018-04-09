// built-in extensions / Number properties / Number.parseInt
module.exports = function() {
  var actualGlobal = Function('return this')();
  return typeof Number.parseInt === 'function'
&& Number.parseInt === actualGlobal.parseInt;

};