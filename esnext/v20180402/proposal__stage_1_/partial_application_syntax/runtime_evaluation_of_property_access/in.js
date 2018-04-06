// proposal (stage 1) / partial application syntax / runtime evaluation of property access
module.exports = function() {
var o = {};
var p = o.f(?, 'b');
o = { x: 'c', f: function(a, b) {
return a + b + this.x;
} };
return p('a') === 'abc';

};