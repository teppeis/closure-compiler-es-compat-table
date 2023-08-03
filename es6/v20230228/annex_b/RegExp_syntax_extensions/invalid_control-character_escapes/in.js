// annex b / RegExp syntax extensions / invalid control-character escapes
module.exports = () => {
  return /\c2/.exec("\\c2")[0] === "\\c2";

};