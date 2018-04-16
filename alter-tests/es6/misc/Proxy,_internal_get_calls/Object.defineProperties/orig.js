// misc / Proxy, internal 'get' calls / Object.defineProperties
module.exports = () => {
// Object.defineProperties -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({foo:{}, bar:{}}, { get: function(o, k) { get.push(k); return o[k]; }});
  Object.defineProperties({}, p);
  return get + '' === "foo,bar";

};