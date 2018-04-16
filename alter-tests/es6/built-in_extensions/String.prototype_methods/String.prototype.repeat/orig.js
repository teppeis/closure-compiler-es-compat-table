// built-in extensions / String.prototype methods / String.prototype.repeat
module.exports = () => {
  return typeof String.prototype.repeat === 'function'
&& "foo".repeat(3) === "foofoofoo";

};