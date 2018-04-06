// annex b / RegExp syntax extensions / octal escape sequences
module.exports = function() {
  return /\041/.exec("!")[0] === "!"
&& /[\041]/.exec("!")[0] === "!";

};