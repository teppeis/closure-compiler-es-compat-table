// proposal (stage 1) / Collections methods / Map.keyBy
module.exports = () => {
  var map = Map.keyBy(new Set([{ id: 101 }, { id: 102 }]), it => it.id)
  return map.size === 2
&& map.get(101).id === 101
&& map.get(102).id === 102;

};