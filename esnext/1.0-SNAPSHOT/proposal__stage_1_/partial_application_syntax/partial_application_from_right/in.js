// proposal (stage 1) / partial application syntax / partial application from right
module.exports = () => {
function f(a, b) {
return a + b;
};
var p = f(?, 'b');
return p('a') === 'ab';

};