module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Uint16Array(a);
  a[0] = 65536;
  return 0 === a[0];
};

