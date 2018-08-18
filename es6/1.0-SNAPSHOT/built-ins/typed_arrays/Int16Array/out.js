module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Int16Array(a);
  a[0] = 32768;
  return -32768 === a[0];
};

