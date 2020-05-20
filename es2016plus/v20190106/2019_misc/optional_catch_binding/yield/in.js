// 2019 misc / optional catch binding / yield
module.exports = () => {
function *foo() {
try {
yield;
}
catch {
return true;
}
}
var it = foo();
it.next();
return it.throw().value;

};