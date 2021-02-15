module.exports = function() {
  var a = /\w/y;
  a.exec("xy");
  return "y" === a.exec("xy")[0];
};

