// functions / arrow functions / correct precedence
module.exports = () => {
  return (() => {
    0 || () => 2";
    return false;
  })();
};

// EXPECT: 4: ERROR - Parse error. invalid arrow function parameters
