// 2021 features / Logical Assignment / ||= setter not unecessarily invoked
module.exports = () => {
let i = 1;
var obj = { get x() { return 1 }, set x(n) { i++; } };
obj.x ||= 2;
return i === 1;

};