// shorthand properties
module.exports = function() {

    var a = 7, b = 8, c = {a,b};
    return c.a === 7 && c.b === 8;
  
}