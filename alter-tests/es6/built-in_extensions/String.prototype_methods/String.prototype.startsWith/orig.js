// built-in extensions / String.prototype methods / String.prototype.startsWith
module.exports = () => {
  return typeof String.prototype.startsWith === 'function'
&& "foobar".startsWith("foo");

};