// misc / Proxy, internal 'get' calls / String.prototype.match
module.exports = function() {
// String.prototype.match -> Get -> [[Get]]
  var get = [];
  var proxied = {};
  proxied[Symbol.toPrimitive] = Function();
  var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
  "".match(p);
  return get[0] === Symbol.match && get[1] === Symbol.toPrimitive && get.length === 2;

};