// misc / Proxy, internal 'deleteProperty' calls / Array.prototype.copyWithin
module.exports = () => {
// Array.prototype.copyWithin -> DeletePropertyOrThrow -> [[Delete]]
  var del = [];
  var p = new Proxy([0,0,0,,,,], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
  p.copyWithin(0,3);
  return del + '' === "0,1,2";

};