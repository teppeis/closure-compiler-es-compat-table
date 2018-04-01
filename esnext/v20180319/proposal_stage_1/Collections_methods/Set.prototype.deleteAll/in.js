// proposal (stage 1) / Collections methods / Set.prototype.deleteAll
module.exports = function() {
  var set = new Set([1, 2, 3, 4]);
  return (
    set.deleteAll(2, 3) === true && set.size === 2 && set.has(1) && set.has(4)
  );
};
