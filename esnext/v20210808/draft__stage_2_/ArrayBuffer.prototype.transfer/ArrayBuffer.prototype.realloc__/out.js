module.exports = function() {
  var a = new ArrayBuffer(1024), b = a.realloc(256);
  return 0 === a.byteLength && 256 === b.byteLength;
};

