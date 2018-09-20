module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Uint32Array(a);
  a[0] = 4294967296;
  return 0 === a[0];
};

