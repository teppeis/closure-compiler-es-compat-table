module.exports = function() {
  try {
    throw Error();
  } catch (a) {
    return !0;
  }
};

