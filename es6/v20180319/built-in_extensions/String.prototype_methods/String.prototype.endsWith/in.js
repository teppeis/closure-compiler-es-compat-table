// built-in extensions / String.prototype methods / String.prototype.endsWith
module.exports = function() {
  return typeof String.prototype.endsWith === 'function'
&& "foobar".endsWith("bar");

};