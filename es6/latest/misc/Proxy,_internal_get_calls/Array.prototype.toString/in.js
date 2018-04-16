// misc / Proxy, internal 'get' calls / Array.prototype.toString
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  // Array.prototype.toString -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ join:Function() }, { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.toString.call(p);
  return get + '' === "join";

};