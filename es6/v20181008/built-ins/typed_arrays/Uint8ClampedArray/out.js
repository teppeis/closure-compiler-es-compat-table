module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Uint8ClampedArray(a);
  a[0] = 256;
  return 255 === a[0];
};

