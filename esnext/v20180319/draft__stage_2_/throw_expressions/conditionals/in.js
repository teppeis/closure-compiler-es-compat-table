// draft (stage 2) / throw expressions / conditionals
module.exports = function() {
true ? 42 : throw 21;
try {
false ? 42 : throw 21;
} catch (e) {
return e === 21;
}

};