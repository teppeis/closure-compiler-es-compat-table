// hoisted block-level function declaration
module.exports = function() {

    // Note: only available outside of strict mode.
    var passed = f() === 2 && g() === 4;
    if (true) { function f(){ return 1; } } else { function f(){ return 2; } }
    if (false){ function g(){ return 3; } } else { function g(){ return 4; } }
    return passed;
  
};