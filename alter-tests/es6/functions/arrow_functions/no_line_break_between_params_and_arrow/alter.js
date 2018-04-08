module.exports = function() {
  return (() => {
    x
      => 2;
    return false;
  })();
};

// EXPECT: 5: ERROR - Parse error. No newline allowed before '=>'
