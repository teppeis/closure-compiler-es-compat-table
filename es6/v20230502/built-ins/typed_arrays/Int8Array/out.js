module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Int8Array(a);
  a[0] = 128;
  return -128 === a[0];
};

