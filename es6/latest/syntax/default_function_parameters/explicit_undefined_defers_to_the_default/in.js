// syntax / default function parameters / explicit undefined defers to the default
module.exports = function() {
  return (function (a = 1, b = 2) { return a === 1 && b === 3; }(undefined, 3));

};