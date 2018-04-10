// proposal (stage 1) / nullish coalescing operator (??)
module.exports = function() {
return null ?? 42 === 42 &&
undefined ?? 42 === 42 &&
false ?? 42 === false &&
'' ?? 42 === '' &&
0 ?? 42 === 0;

};