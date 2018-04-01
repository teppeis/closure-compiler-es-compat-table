// syntax / RegExp "y" and "u" flags / "y" flag, lastIndex
module.exports = function() {
  var re = new RegExp("yy", "y");
  re.lastIndex = 3;
  var result = re.exec("xxxyyxx")[0];
  return result === "yy" && re.lastIndex === 5;
};
