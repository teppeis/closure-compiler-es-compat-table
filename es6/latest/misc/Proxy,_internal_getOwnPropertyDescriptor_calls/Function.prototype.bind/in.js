// misc / Proxy, internal 'getOwnPropertyDescriptor' calls / Function.prototype.bind
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  // Function.prototype.bind -> HasOwnProperty -> [[GetOwnProperty]]
  var gopd = [];
  var p = new Proxy(Function(),
    { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
  p.bind();
  return gopd + '' === "length";

};