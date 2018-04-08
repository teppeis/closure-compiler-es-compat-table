module.exports = function() {
  return (() => {
    0 || () => 2";
    return false;
  })();
};

// EXPECT: 4: ERROR - Parse error. invalid arrow function parameters
