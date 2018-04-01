module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new DataView(a);
  a.setInt16(0, 32768);
  return -32768 === a.getInt16(0);
};

