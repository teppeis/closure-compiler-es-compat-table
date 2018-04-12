// proposal (stage 1) / optional chaining operator (?.) / optional method call
module.exports = function() {
var foo = { baz: function () { return 42; } };
var bar = null;
return foo?.baz() === 42 && bar?.baz() === undefined;

};