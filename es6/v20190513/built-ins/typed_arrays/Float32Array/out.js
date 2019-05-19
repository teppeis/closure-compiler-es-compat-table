module.exports = function() {
  var a = new ArrayBuffer(64);
  a = new Float32Array(a);
  a[0] = 0.1;
  return 0.10000000149011612 === a[0];
};

