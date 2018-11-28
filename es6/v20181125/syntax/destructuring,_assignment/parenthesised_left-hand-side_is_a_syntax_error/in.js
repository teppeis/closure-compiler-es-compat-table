// syntax / destructuring, assignment / parenthesised left-hand-side is a syntax error
module.exports = () => {
  var a, b;
  ({a,b} = {a:1,b:2});
  ({a,b}) = {a:3,b:4};
  return false;
};

// EXPECT: 5: ERROR - Parse error. invalid assignment target
