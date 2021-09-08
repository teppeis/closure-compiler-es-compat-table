// annex b / RegExp syntax extensions / incomplete patterns and quantifiers
module.exports = () => {
  return /x{1/.exec("x{1")[0] === "x{1"
&& /x]1/.exec("x]1")[0] === "x]1";

};