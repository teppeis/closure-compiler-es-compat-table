module.exports = function() {
  return "\\c2" === /\c2/.exec("\\c2")[0];
};

