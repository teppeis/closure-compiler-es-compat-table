// proposal (stage 1) / Collections methods / Map.groupBy
module.exports = function() {
var map = Map.groupBy(new Set([1, 2, 3, 4]), it => it % 2)
        return map.size === 2
          && map.get(0)[0] === 2
          && map.get(0)[1] === 4
          && map.get(1)[0] === 1
          && map.get(1)[1] === 3;
      
};