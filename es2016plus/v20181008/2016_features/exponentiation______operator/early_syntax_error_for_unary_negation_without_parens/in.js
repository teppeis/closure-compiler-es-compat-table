// 2016 features / exponentiation (**) operator / early syntax error for unary negation without parens
module.exports = () => {
  if (2 ** 3 !== 8) {
    return false;
  }
  -5 ** 2;
  return false;
};

// EXPECT: 6: ERROR - Parse error. Unary operator '-' requires parentheses before '**'
