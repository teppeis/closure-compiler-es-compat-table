module.exports = function() {
  return "!" === /\041/.exec("!")[0] && "!" === /[\041]/.exec("!")[0];
};

