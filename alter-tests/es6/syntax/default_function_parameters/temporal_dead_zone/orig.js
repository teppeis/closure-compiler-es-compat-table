// syntax / default function parameters / temporal dead zone
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  return (function(x = 1) {
    try {
      eval("(function(a=a){}())");
      return false;
    } catch(e) {}
    try {
      eval("(function(a=b,b){}())");
      return false;
    } catch(e) {}
    return true;
  }());

};