module.exports = function() {
  var a = [1, 2, 3];
  return 1 === a.at(0) && 1 === a.at(-3) && 2 === a.at(1) && 2 === a.at(-2) && 3 === a.at(2) && 3 === a.at(-1) && void 0 === a.at(3) && void 0 === a.at(-4);
};

