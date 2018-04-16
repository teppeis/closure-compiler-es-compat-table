// built-in extensions / String.prototype methods / String.prototype.includes
module.exports = () => {
  return typeof String.prototype.includes === 'function'
&& "foobar".includes("oba");

};