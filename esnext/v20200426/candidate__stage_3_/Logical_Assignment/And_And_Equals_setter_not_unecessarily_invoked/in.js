// candidate (stage 3) / Logical Assignment / &&= setter not unecessarily invoked
module.exports = () => {
let i = 1;
var obj = { get x() { return }, set x(n) { i++; } };
obj.x &&= 2;
return i === 1;

};