// syntax / destructuring, parameters / defaults, separate scope
module.exports = function() {
return (function({a=function(){
          return typeof b === 'undefined';
        }}){
          var b = 1;
          return a();
        }({}));
      
};