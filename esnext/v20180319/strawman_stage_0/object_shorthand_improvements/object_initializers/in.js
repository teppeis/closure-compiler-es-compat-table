// strawman (stage 0) / object shorthand improvements / object initializers
module.exports = function() {
var foo = { bar: 42, baz: 33 };
        var fuz = { foo.bar, foo['baz'] };
        return fuz.bar === 42 && fuz.baz === 33;
      
};