// proposal (stage 1) / optional chaining operator (?.) / optional bracket access
module.exports = function() {
var foo = { baz: 42 };
var bar = null;
return foo?.['baz'] === 42 && bar?.['baz'] === undefined;

};