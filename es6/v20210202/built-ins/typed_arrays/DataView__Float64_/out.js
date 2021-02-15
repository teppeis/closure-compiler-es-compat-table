module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new DataView(a);
  a.setFloat64(0, 0.1);
  return 0.1 === a.getFloat64(0);
};

