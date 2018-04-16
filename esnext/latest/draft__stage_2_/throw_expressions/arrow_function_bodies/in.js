// draft (stage 2) / throw expressions / arrow function bodies
module.exports = () => {
var fn = () => throw 42;
try {
fn();
} catch (e) {
return e === 42;
}

};