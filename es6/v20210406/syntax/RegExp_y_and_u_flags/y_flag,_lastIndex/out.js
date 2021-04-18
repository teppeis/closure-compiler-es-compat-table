module.exports = function() {
  var a = /yy/y;
  a.lastIndex = 3;
  return "yy" === a.exec("xxxyyxx")[0] && 5 === a.lastIndex;
};

