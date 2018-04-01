// built-in extensions / String.prototype methods / String.prototype.startsWith throws on RegExp
module.exports = function() {
  try {
    "a".startsWith(/./);
  } catch (e) {
    return typeof String.prototype.startsWith === "function";
  }
};
