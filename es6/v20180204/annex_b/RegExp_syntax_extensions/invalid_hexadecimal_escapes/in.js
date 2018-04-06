// annex b / RegExp syntax extensions / invalid hexadecimal escapes
module.exports = function() {
  return /\x1/.exec("x1")[0] === "x1"
&& /[\x1]/.exec("x")[0] === "x";

};