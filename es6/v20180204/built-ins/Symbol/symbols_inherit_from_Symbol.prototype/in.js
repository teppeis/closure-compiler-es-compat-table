// built-ins / Symbol / symbols inherit from Symbol.prototype
module.exports = function() {
var symbol = Symbol();
        var passed = symbol.foo === undefined;
        Symbol.prototype.foo = 2;
        passed &= symbol.foo === 2;
        delete Symbol.prototype.foo;
        return passed;
      
};