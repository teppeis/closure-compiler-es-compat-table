module.exports = function() {
  var a = new ArrayBuffer(64), a = new DataView(a);
  a.setInt8(0, 128);
  return -128 === a.getInt8(0);
};

