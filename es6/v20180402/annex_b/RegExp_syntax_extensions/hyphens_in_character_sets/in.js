// annex b / RegExp syntax extensions / hyphens in character sets
module.exports = () => {
  return /[\w-_]/.exec("-")[0] === "-";

};