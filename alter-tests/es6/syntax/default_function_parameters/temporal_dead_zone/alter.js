module.exports = function() {
  (function(a=a){}());
  (function(a=b,b){}());
  return false;
};

// EXPECT: 3: ERROR - Illegal variable reference before declaration: a
// EXPECT: 4: ERROR - Illegal variable reference before declaration: b
