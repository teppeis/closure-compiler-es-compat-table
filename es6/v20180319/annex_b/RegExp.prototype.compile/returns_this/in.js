// annex b / RegExp.prototype.compile / returns this
module.exports = function() {
  var rx = /a/;
  return rx.compile("b") === rx;
};
