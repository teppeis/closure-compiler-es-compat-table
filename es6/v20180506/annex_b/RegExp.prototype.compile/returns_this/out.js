module.exports = function() {
  var a = /a/;
  return a.compile("b") === a;
};

