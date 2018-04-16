// 2016 misc / Proxy internal calls, Array.prototype.includes
module.exports = () => {
// Array.prototype.includes -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({length: 3, 0: '', 1: '', 2: '', 3: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.includes.call(p, {});
  if (get + '' !== "length,0,1,2") return;
  get = [];
  p = new Proxy({length: 4, 0: NaN, 1: '', 2: NaN, 3: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.includes.call(p, NaN, 1);
  return (get + '' === "length,1,2");

};