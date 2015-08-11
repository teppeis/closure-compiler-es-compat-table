module.exports = function() {
  var a = new ArrayBuffer(64), a = new DataView(a);
  a.setFloat32(0, .1);
  return .10000000149011612 === a.getFloat32(0);
};

