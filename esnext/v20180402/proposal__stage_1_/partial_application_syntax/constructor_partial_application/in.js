// proposal (stage 1) / partial application syntax / constructor partial application
module.exports = () => {
function F(a, b) {
this.x = a + b;
}
var p = new F(?, 'b');
return p('a').x === 'ab';

};