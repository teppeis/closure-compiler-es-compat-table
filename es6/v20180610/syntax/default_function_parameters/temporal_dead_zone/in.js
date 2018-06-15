// syntax / default function parameters / temporal dead zone
module.exports = () => {
  (function(a=a){}());
  (function(a=b,b){}());
  return false;
};

// EXPECT: 3: ERROR - Illegal variable reference before declaration: a
// EXPECT: 4: ERROR - Illegal variable reference before declaration: b
