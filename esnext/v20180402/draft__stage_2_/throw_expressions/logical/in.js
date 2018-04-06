// draft (stage 2) / throw expressions / logical
module.exports = function() {
var a, b;
try {
a = 19 || throw 77;
b = 88 && throw 23;
} catch (e) {
return a + e === 42;
}

};