module.exports = function() {
  var a = RegExp("\\w", "y");
  a.exec("xy");
  return "y" === a.exec("xy")[0];
};

