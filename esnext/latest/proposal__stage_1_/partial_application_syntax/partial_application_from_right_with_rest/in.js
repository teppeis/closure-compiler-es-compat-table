// proposal (stage 1) / partial application syntax / partial application from right with rest
module.exports = function() {
function f(a, b, c) {
return a + b + c;
};
var p = f(..., 'c');
return p('a', 'b') === 'abc';

};