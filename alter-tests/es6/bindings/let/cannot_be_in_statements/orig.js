module.exports = function() {
let bar = 1;
try {
Function("if(true) let baz = 1;")();
} catch(e) {
return true;
}

};