// misc / Proxy, internal 'get' calls / Date.prototype.toJSON
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  // Date.prototype.toJSON -> ToPrimitive -> Get -> [[Get]]
  // Date.prototype.toJSON -> Invoke -> GetMethod -> GetV -> [[Get]]
  var get = [];
  var p = new Proxy({toString:Function(),toISOString:Function()}, { get: function(o, k) { get.push(k); return o[k]; }});
  Date.prototype.toJSON.call(p);
  return get[0] === Symbol.toPrimitive && get.slice(1) + '' === "valueOf,toString,toISOString";

};