// built-ins / typed arrays / Int32Array
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var view = new Int32Array(buffer);
  view[0] = 0x80000000;
  return view[0] === -0x80000000;
};
