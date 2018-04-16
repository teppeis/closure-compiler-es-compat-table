// proposal (stage 1) / partial application syntax / lexical `this`
module.exports = () => {
function f(a, b) {
return a + b + (this === o);
}
var o = { f: f(?, 'b') };
return o.f('a') === 'abfalse';

};