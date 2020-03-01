module.exports = function() {
  var a = (new Uint8Array([1, 2])).buffer, b = a.transfer();
  return 0 === a.byteLength && 2 === b.byteLength;
};

