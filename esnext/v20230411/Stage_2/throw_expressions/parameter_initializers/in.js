// Stage 2 / throw expressions / parameter initializers
module.exports = () => {
function fn (arg = throw 42) {
return arg;
}
if (fn(21) !== 21) return false;
try {
fn();
} catch (e) {
return e === 42;
}

};