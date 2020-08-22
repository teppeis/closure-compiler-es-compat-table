// proposal (stage 1) / Collections methods / WeakSet.prototype.addAll
module.exports = () => {
  var a = {};
  var b = {};
  var c = {};
  var d = {};
  var set = new WeakSet([a, b]);
  set.addAll(c, d)
  return set.has(a)
&& set.has(b)
&& set.has(c)
&& set.has(d);

};