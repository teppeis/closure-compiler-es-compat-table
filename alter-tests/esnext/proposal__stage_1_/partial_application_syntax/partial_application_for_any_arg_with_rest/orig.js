// proposal (stage 1) / partial application syntax / partial application for any arg with rest
module.exports = function() {
function f(a, b, c, d, e) {
return a + b + c + d + e;
};
var p = f(..., 'c', ...);
return p('a', 'b') === 'abcab';

};