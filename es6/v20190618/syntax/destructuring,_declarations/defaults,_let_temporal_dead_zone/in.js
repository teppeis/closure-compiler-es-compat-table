// syntax / destructuring, declarations / defaults, let temporal dead zone
module.exports = () => {
  var {a, b = 2} = {a:1};
  let {c = c} = {};
  let {c = d, d} = {d:1};
  return false;
};

// EXPECT: 4: ERROR - [JSC_REFERENCE_BEFORE_DECLARE_ERROR] Illegal variable reference before declaration: c
// EXPECT: 5: ERROR - [JSC_REDECLARED_VARIABLE_ERROR] Illegal redeclared variable: c
// EXPECT: 5: ERROR - [JSC_REFERENCE_BEFORE_DECLARE_ERROR] Illegal variable reference before declaration: d
