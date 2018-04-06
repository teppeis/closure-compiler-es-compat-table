// subclassing / RegExp is subclassable / RegExp.prototype.exec
module.exports = function() {
  class R extends RegExp {}
  var r = new R("baz","g");
  return r.exec("foobarbaz")[0] === "baz" && r.lastIndex === 9;

};