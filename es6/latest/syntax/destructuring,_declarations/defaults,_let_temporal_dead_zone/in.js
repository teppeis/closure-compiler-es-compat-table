// syntax / destructuring, declarations / defaults, let temporal dead zone
module.exports = () => {
  var {a, b = 2} = {a:1};
  let {c = c} = {};
  let {c = d, d} = {d:1};
  return false;
};

// EXPECT: 4: ERROR - Illegal variable reference before declaration: c
// EXPECT: 5: ERROR - Illegal variable reference before declaration: d
