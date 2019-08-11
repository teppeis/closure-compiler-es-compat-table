// proposal (stage 1) / Collections methods / WeakSet.prototype.deleteAll
module.exports = () => {
  var a = {};
  var b = {};
  var c = {};
  var d = {};
  var set = new WeakSet([a, b, c, d]);
  set.deleteAll(a, c)
  return !set.has(a)
&& set.has(b)
&& !set.has(c)
&& set.has(d);

};