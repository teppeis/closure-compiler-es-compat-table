module.exports = function() {
  return "x1" === /\x1/.exec("x1")[0] && "x" === /[\x1]/.exec("x")[0];
};

