// strawman (stage 0) / object shorthand improvements / destructuring assignments
module.exports = () => {
var foo = { bar: 42, baz: 33 };
var fuz = {};
({ fuz.bar, fuz['baz'] } = foo);
return fuz.bar === 42 && fuz.baz === 33;

};