module.exports = function() {
  var a = new ArrayBuffer(64), a = new DataView(a);
  a.setUint32(0, 4294967296);
  return 0 === a.getUint32(0);
};

