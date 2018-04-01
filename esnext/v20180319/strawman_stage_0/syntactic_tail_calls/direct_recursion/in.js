// strawman (stage 0) / syntactic tail calls / direct recursion
module.exports = function() {
"use strict";
        return (function f(n){
          if (n <= 0) {
            return  "foo";
          }
          return continue f(n - 1);
        }(1e6)) === "foo";
      
};