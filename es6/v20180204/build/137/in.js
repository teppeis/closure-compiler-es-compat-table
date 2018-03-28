// const: for-in loop iteration scope
module.exports = function() {
var scopes = [];
        for(const i in { a:1, b:1 }) {
          scopes.push(function(){ return i; });
        }
        return (scopes[0]() === "a" && scopes[1]() === "b");
      
};