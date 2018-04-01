// proposal (stage 1) / Collections methods / Set.prototype.reduce
module.exports = function() {
return new Set([1, 2, 3]).reduce((memo, it) => memo + it) === 6;
      
};