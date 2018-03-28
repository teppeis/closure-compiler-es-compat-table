// const: for-of loop iteration scope (strict mode)
module.exports = function() {
'use strict';
        var scopes = [];
        for(const i of ['a','b']) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      
};