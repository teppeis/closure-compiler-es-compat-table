module.exports = function() {
  return "a => b" === eval("(a => b)") + "";
};

