module.exports = function() {
  Symbol();
  try {
    new Symbol;
  } catch (a) {
    return !0;
  }
};

