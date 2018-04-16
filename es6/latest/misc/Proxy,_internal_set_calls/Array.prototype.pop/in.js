// misc / Proxy, internal 'set' calls / Array.prototype.pop
module.exports = () => {
// Array.prototype.pop -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([], { set: function(o, k, v) { set.push(k); o[k] = v; return true; }});
  p.pop();
  return set + '' === "length";

};