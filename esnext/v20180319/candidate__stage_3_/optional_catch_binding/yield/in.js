// candidate (stage 3) / optional catch binding / yield
module.exports = function() {
function *foo() {
try {
yield;
throw new Error();
}
catch {
return true;
}
}

var it = foo();
it.next();
return it.next().value;

};