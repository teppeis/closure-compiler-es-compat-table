module.exports = function() {
  return "function" === typeof Object.is && Object.is(NaN, NaN) && !Object.is(-0, 0);
};

