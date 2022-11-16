module.exports = function() {
  return "!" === /\41/.exec("!")[0] && "!" === /[\41]/.exec("!")[0];
};

