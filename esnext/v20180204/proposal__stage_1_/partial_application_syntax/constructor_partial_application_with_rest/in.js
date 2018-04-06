// proposal (stage 1) / partial application syntax / constructor partial application with rest
module.exports = function() {
function F(a, b, c) {
this.x = a + b + c;
}
var p = new F('a', ...);
return p('b', 'c').x === 'abc';

};