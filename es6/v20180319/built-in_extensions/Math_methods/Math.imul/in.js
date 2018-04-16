// built-in extensions / Math methods / Math.imul
module.exports = () => {
  return Math.imul(0, 0) === 0
    && Math.imul(2, 4) === 8;
};
