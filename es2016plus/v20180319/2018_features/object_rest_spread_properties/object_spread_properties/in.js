// 2018 features / object rest/spread properties / object spread properties
module.exports = function() {
var spread = {b: 2, c: 3};
          var O = {a: 1, ...spread};
          return O !== spread && (O.a + O.b + O.c) === 6;
          
};