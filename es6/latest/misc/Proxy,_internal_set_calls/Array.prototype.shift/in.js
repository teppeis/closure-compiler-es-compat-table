// misc / Proxy, internal 'set' calls / Array.prototype.shift
module.exports = () => {
// Array.prototype.shift -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([0,0,,0], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.shift();
  return set + '' === "0,2,length";

};