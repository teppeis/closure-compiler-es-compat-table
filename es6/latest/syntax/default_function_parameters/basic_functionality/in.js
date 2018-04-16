// syntax / default function parameters / basic functionality
module.exports = () => {
  return (function (a = 1, b = 2) { return a === 3 && b === 2; }(3));

};