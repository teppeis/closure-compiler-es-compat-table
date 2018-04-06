module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new DataView(a);
  a.setUint16(0, 65536);
  return 0 === a.getUint16(0);
};

