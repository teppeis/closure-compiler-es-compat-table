// proposal (stage 1) / partial application syntax / partial application for any arg
module.exports = () => {
function f(a, b, c) {
return a + b + c;
};
var p = f(?, 'b', ?);
return p('a', 'c') === 'abc';

};