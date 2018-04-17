module.exports = function() {
  var a = {};
  return 1 === (a.y = 1, a).y;
};

