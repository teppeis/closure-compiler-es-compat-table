// built-in extensions / RegExp.prototype properties / RegExp.prototype.flags
module.exports = () => {
  return /./igm.flags === "gim" && /./.flags === "";

};