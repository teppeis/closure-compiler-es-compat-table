module.exports = function() {
  var a = {a:1, x:2}, b = [3, 4];
  return 1 === a.a && 2 === a.x && !("y" in a) && "3,4" === b + "";
};

