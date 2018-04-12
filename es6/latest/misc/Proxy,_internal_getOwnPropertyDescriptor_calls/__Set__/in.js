// misc / Proxy, internal 'getOwnPropertyDescriptor' calls / [[Set]]
module.exports = function() {
// [[Set]] -> [[GetOwnProperty]]
  var gopd = [];
  var p = new Proxy({},
    { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
  p.foo = 1; p.bar = 1;
  return gopd + '' === "foo,bar";

};