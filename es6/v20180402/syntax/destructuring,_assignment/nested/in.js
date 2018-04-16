// syntax / destructuring, assignment / nested
module.exports = () => {
  var e,f,g,h,i;
  [e, {x:f, g}] = [9, {x:10}];
  ({h, x:[i]} = {h:11, x:[12]});
  return e === 9 && f === 10 && g === undefined
&& h === 11 && i === 12;

};