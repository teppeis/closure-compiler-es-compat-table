// built-in extensions / Math methods / Math.imul
module.exports = function() {
  return Math.imul(0, 0) === 0
    && Math.imul(2, 4) === 8;
};
