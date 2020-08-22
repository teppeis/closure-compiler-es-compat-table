// proposal (stage 1) / Collections methods / WeakMap.prototype.deleteAll
module.exports = () => {
  var a = {};
  var b = {};
  var c = {};
  var d = {};
  var map = new WeakMap([[a, 1], [b, 2], [c, 3], [d, 4]]);
  map.deleteAll(a, c)
  return !map.has(a)
&& map.get(b) === 2
&& !map.has(c)
&& map.get(d) === 4;

};