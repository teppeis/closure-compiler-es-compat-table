// 2020 features / optional chaining operator (?.) / optional bracket access
module.exports = () => {
var foo = { baz: 42 };
var bar = null;
return foo?.['baz'] === 42 && bar?.['baz'] === undefined;

};