module.exports = function() {
return new Function("{a, x:b, y:e}","[c, d]",
"return a === 1 && b === 2 && c === 3 && "
+ "d === 4 && e === undefined;"
)({a:1, x:2}, [3, 4]);

};