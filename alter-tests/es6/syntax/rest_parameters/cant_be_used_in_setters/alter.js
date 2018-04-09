// syntax / rest parameters / can't be used in setters
module.exports = function() {
  return (function (...args) {
    var obj = {
      set e(...args) {}
    };
    return true;
  }());
};

// EXPECT: 5: ERROR - Parse error. 'identifier' expected
