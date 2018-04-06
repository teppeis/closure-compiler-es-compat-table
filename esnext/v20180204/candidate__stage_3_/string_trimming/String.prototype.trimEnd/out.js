module.exports = function() {
  return " \t \n abc" === " \t \n abc   \t\n".trimEnd();
};

