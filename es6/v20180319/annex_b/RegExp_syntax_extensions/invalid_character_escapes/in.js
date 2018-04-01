// annex b / RegExp syntax extensions / invalid character escapes
module.exports = function() {
  return /\z/.exec("\\z")[0] === "z" && /[\z]/.exec("[\\z]")[0] === "z";
};
