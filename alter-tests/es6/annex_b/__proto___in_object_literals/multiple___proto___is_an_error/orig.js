module.exports = function() {
try {
eval("({ __proto__ : [], __proto__: {} })");
}
catch(e) {
return true;
}

};