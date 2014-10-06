// destructuring
module.exports = function() {

    // Array destructuring
    var [a, , [b], g] = [5, null, [6]];
    // Object destructuring
    var {c, x:d, h} = {c:7, x:8};
    // Combined destructuring
    var [e, {x:f, i}] = [9, {x:10}];

    return a === 5 && b === 6 && c === 7 &&
           d === 8 && e === 9 && f === 10 &&
           g === undefined && h === undefined && i === undefined;
  
}