// misc / Proxy, internal 'get' calls / RegExp.prototype[Symbol.search]
module.exports = function() {
// RegExp.prototype[Symbol.search] -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.search].call(p);
  return get + '' === "lastIndex,exec,lastIndex";

};