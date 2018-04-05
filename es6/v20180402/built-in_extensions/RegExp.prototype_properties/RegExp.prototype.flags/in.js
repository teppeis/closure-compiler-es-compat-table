// built-in extensions / RegExp.prototype properties / RegExp.prototype.flags
module.exports = function() {
  return /./gim.flags === "gim" && /./.flags === "";
};
