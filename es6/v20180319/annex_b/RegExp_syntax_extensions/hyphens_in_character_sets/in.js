// annex b / RegExp syntax extensions / hyphens in character sets
module.exports = function() {
  return /[\w-_]/.exec("-")[0] === "-";
};
