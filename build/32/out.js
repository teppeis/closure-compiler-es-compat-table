module.exports = function() {
  var a = {};
  return 1 === (a.y = function() {
    return 1;
  }, a).y();
};

