// syntax / destructuring, parameters / object destructuring with primitives
module.exports = function() {
return function({toFixed}, {slice}) {
          return toFixed === Number.prototype.toFixed
            && slice === String.prototype.slice;
        }(2,'');
      
};