module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Float64Array(a);
  a[0] = 0.1;
  return 0.1 === a[0];
};

