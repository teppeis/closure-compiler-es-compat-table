// syntax / destructuring, declarations / object destructuring with primitives
module.exports = function() {
var {toFixed} = 2;
        var {slice} = '';
        return toFixed === Number.prototype.toFixed
          && slice === String.prototype.slice;
      
};