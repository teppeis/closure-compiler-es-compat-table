module.exports = function() {
  var a = /\w/, b = RegExp("\\w", "y");
  a.exec("xy");
  b.exec("xy");
  return "x" === a.exec("xy")[0] && "y" === b.exec("xy")[0];
};

