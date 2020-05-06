// candidate (stage 3) / Logical Assignment / &&= short-circuiting behaviour
module.exports = () => {
let a;
let i = 1;
a &&= ++i;
return typeof a === 'undefined' && i === 1;

};