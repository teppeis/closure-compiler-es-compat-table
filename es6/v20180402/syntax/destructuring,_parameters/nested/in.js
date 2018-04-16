// syntax / destructuring, parameters / nested
module.exports = () => {
  return function([e, {x:f, g}], {h, x:[i]}) {
    return e === 9 && f === 10 && g === undefined
&& h === 11 && i === 12;
  }([9, {x:10}],{h:11, x:[12]});

};