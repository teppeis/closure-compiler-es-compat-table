// candidate (stage 3) / Logical Assignment / ||= short-circuiting behaviour
module.exports = () => {
let a = 1;
let i = 1;
a ||= ++i;
return a === 1 && i === 1;

};