module.exports = function() {
  return "u1" === /\u1/.exec("u1")[0] && "u" === /[\u1]/.exec("u")[0];
};

