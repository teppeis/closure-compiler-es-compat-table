// proper tail calls (tail call optimisation)
module.exports = function() {

    "use strict";
    return (function f(n){
      if (n <= 0) {
        return  "foo";
      }
      return f(n - 1);
    }(1e6)) === "foo";
  
};