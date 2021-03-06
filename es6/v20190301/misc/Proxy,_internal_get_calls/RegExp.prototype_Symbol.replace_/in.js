// misc / Proxy, internal 'get' calls / RegExp.prototype[Symbol.replace]
module.exports = () => {
// RegExp.prototype[Symbol.replace] -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.replace].call(p);
  p.global = true;
  RegExp.prototype[Symbol.replace].call(p);
  return get + '' === "global,exec,global,unicode,exec";

};