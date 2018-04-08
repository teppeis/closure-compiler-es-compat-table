module.exports = function() {
class C {
* generator() {
yield 5; yield 6;
}
};
try {
Function("class D { * constructor() { return {}; } }");
} catch(e) {
return true;
}

};