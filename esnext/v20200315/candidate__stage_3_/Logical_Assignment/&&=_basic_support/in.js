// candidate (stage 3) / Logical Assignment / &&= basic support
module.exports = () => {
let a;
let b = 0;
let c = 1;
a &&= 2;
b &&= 2;
c &&= 2;
return typeof a === 'undefined' && b === 0 && c === 2;

};