// misc / Proxy, internal 'get' calls / Function.prototype.bind
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  // Function.prototype.bind -> Get -> [[Get]]
  var get = [];
  var p = new Proxy(Function(), { get: function(o, k) { get.push(k); return o[k]; }});
  Function.prototype.bind.call(p);
  return get + '' === "length,name";

};