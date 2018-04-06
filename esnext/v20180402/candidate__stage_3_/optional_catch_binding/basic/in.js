// candidate (stage 3) / optional catch binding / basic
module.exports = function() {
try {
throw new Error();
}
catch {
return true;
}
return false;

};