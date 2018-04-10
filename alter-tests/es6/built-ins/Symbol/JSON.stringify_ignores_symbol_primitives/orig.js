// built-ins / Symbol / JSON.stringify ignores symbol primitives
module.exports = function() {
  var object = { foo: Symbol() };
  object[Symbol()] = 1;
  var array = [Symbol()];
  return JSON.stringify(object) === '{}' && JSON.stringify(array) === '[null]' && JSON.stringify(Symbol()) === undefined;

};