// proposal (stage 1) / partial application syntax / partial application from left with rest
module.exports = () => {
function f(a, b, c) {
return a + b + c;
};
var p = f('a', ...);
return p('b', 'c') === 'abc';

};