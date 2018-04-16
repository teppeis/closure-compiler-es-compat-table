// built-in extensions / Math methods / Math.clz32
module.exports = () => {
  return Math.clz32(0) === 32
    &&  Math.clz32(1) === 31;
};
