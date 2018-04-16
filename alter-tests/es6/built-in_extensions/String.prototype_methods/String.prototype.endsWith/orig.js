// built-in extensions / String.prototype methods / String.prototype.endsWith
module.exports = () => {
  return typeof String.prototype.endsWith === 'function'
&& "foobar".endsWith("bar");

};