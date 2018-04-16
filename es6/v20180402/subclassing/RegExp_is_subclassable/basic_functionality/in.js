// subclassing / RegExp is subclassable / basic functionality
module.exports = () => {
  class R extends RegExp {}
  var r = new R("baz","g");
  return r.global && r.source === "baz";

};