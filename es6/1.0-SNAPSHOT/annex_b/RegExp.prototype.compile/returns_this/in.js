// annex b / RegExp.prototype.compile / returns this
module.exports = () => {
  var rx = /a/;
  return rx.compile('b') === rx;

};