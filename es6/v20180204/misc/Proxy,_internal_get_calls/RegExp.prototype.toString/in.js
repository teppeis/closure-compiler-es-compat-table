// misc / Proxy, internal 'get' calls / RegExp.prototype.toString
module.exports = function() {
// RegExp.prototype.toString -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype.toString.call(p);
  return get + '' === "source,flags";

};