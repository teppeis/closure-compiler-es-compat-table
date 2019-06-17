// draft (stage 2) / optional chaining operator (?.) / optional property access
module.exports = () => {
var foo = { baz: 42 };
var bar = null;
return foo?.baz === 42 && bar?.baz === undefined;

};