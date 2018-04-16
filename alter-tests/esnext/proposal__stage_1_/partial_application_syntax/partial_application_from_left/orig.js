// proposal (stage 1) / partial application syntax / partial application from left
module.exports = () => {
function f(a, b) {
return a + b;
};
var p = f('a', ?);
return p('b') === 'ab';

};