module.exports = function() {
  var a = new ArrayBuffer(64), a = new Int32Array(a);
  a[0] = 2147483648;
  return -2147483648 === a[0];
};

