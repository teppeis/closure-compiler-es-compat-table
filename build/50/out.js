module.exports = function() {
  var c = eval("`x" + String.fromCharCode(13) + "y`"), a = eval("`x" + String.fromCharCode(10) + "y`"), b = eval("`x" + String.fromCharCode(13, 10) + "y`");
  return 3 === c.length && 3 === a.length && 3 === b.length && c[1] === a[1] && a[1] === b[1] && "\n" === b[1];
};

