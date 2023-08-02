module.exports = function() {
  return "z" === /z/.exec("\\z")[0] && "z" === /[z]/.exec("[\\z]")[0];
};

