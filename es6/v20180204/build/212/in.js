// generators: %GeneratorPrototype% prototype chain
module.exports = function() {
function * generatorFn(){}
        var g = generatorFn();
        var ownProto = Object.getPrototypeOf(g);
        var passed = ownProto === generatorFn.prototype;

        var sharedProto = Object.getPrototypeOf(ownProto);
        var iterProto = Object.getPrototypeOf(sharedProto);

        passed &= iterProto.hasOwnProperty(Symbol.iterator) &&
          !sharedProto     .hasOwnProperty(Symbol.iterator) &&
          !ownProto        .hasOwnProperty(Symbol.iterator) &&
          g[Symbol.iterator]() === g;

        return passed;
      
};