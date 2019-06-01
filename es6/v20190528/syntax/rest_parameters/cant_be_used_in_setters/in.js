// syntax / rest parameters / can't be used in setters
module.exports = () => {
  return (function (...args) {
    var obj = {
      set e(...args) {}
    };
    return true;
  }());
};

// EXPECT: 5: ERROR - [JSC_PARSE_ERROR] Parse error.
