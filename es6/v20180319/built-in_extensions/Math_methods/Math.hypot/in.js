// built-in extensions / Math methods / Math.hypot
module.exports = function() {
  return Math.hypot() === 0 &&
Math.hypot(1) === 1 &&
Math.hypot(9, 12, 20) === 25 &&
Math.hypot(27, 36, 60, 100) === 125;

};