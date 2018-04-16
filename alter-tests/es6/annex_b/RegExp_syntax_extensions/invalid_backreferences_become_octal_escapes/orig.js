// annex b / RegExp syntax extensions / invalid backreferences become octal escapes
module.exports = () => {
  return /\41/.exec("!")[0] === "!"
&& /[\41]/.exec("!")[0] === "!";

};