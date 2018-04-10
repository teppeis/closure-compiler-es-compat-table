// built-in extensions / Number properties / Number.parseFloat
module.exports = function() {
  var actualGlobal = Function('return this')();
  return typeof Number.parseFloat === 'function'
&& Number.parseFloat === actualGlobal.parseFloat;

};
