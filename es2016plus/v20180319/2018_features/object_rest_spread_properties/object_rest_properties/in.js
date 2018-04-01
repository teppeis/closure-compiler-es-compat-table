// 2018 features / object rest/spread properties / object rest properties
module.exports = function() {
var {a, ...rest} = {a: 1, b: 2, c: 3};
          return a === 1 && rest.a === undefined && rest.b === 2 && rest.c === 3;
          
};