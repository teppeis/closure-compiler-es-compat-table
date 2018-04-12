// built-in extensions / Object static methods / Object.is
module.exports = function() {
  return Object.is(1, 1)
    && Object.is(NaN, NaN)
    && Object.is(0, 0)
    && !Object.is(-0, 0);
};
