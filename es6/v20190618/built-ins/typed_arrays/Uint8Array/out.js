module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Uint8Array(a);
  a[0] = 256;
  return 0 === a[0];
};

