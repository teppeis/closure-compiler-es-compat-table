module.exports = function() {
  return "abc   \t\n" === " \t \n abc   \t\n".trimLeft();
};

