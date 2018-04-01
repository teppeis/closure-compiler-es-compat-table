module.exports = function() {
  var a = {};
  return 4 === (a["foo bar"] = function() {
    return 4;
  }, a)["foo bar"]();
};

