module.exports = function() {
  var a = new ArrayBuffer(64), a = new DataView(a);
  a.setUint8(0, 256);
  return 0 === a.getUint8(0);
};

