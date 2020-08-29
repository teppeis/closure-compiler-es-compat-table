module.exports = function() {
  var a = [1, 2, 3];
  return 1 === a.item(0) && 1 === a.item(-3) && 2 === a.item(1) && 2 === a.item(-2) && 3 === a.item(2) && 3 === a.item(-1) && void 0 === a.item(3) && void 0 === a.item(-4);
};

