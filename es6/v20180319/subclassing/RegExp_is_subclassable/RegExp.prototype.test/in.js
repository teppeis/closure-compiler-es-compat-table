// subclassing / RegExp is subclassable / RegExp.prototype.test
module.exports = function() {
  class R extends RegExp {}
  var r = new R("baz");
  return r.test("foobarbaz");
};
