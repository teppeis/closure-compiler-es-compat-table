// 2020 features / optional chaining operator (?.) / optional function call
module.exports = () => {
var foo = { baz: function () { return 42; } };
var bar = {};
function baz() { return 42; };
var n;
return foo.baz?.() === 42 && bar.baz?.() === undefined && baz?.() === 42 && n?.() === undefined;

};