// misc / Proxy, internal 'get' calls / JSON.stringify
module.exports = () => {
// JSON.stringify -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({}, { get: function(o, k) { get.push(k); return o[k]; }});
  JSON.stringify(p);
  return get + '' === "toJSON";

};