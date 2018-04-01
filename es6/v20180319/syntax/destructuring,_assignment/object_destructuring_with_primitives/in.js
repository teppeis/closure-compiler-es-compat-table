// syntax / destructuring, assignment / object destructuring with primitives
module.exports = function() {
var toFixed, slice;
        ({toFixed} = 2);
        ({slice} = '');
        return toFixed === Number.prototype.toFixed
          && slice === String.prototype.slice;
      
};