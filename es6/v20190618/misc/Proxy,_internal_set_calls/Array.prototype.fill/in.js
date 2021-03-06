// misc / Proxy, internal 'set' calls / Array.prototype.fill
module.exports = () => {
// Array.prototype.fill -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([1,2,3,4,5,6], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.fill(0, 3);
  return set + '' === "3,4,5";

};