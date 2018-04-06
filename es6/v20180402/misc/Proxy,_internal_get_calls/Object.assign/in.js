// misc / Proxy, internal 'get' calls / Object.assign
module.exports = function() {
// Object.assign -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({foo:1, bar:2}, { get: function(o, k) { get.push(k); return o[k]; }});
  Object.assign({}, p);
  return get + '' === "foo,bar";

};