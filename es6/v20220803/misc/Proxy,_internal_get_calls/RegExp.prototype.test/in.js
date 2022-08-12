// misc / Proxy, internal 'get' calls / RegExp.prototype.test
module.exports = () => {
// RegExp.prototype.test -> RegExpExec -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype.test.call(p);
  return get + '' === "exec";

};