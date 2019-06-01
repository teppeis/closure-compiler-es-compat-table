// functions / arrow functions / no line break between params and <code>=></code>
module.exports = () => {
  return (() => {
    x
      => 2;
    return false;
  })();
};

// EXPECT: 5: ERROR - [JSC_PARSE_ERROR] Parse error. No newline allowed before '=>'
