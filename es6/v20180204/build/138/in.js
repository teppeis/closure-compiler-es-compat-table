// const: for-of loop iteration scope
module.exports = function() {
var scopes = [];
        for(const i of ['a','b']) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      
};