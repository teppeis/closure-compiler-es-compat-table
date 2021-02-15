module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new DataView(a);
  a.setInt32(0, 2147483648);
  return -2147483648 === a.getInt32(0);
};

