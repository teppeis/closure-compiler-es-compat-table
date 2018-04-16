// annex b / RegExp syntax extensions / invalid character escapes
module.exports = () => {
  return /\z/.exec("\\z")[0] === "z"
&& /[\z]/.exec("[\\z]")[0] === "z";

};