// built-ins / typed arrays / Int8Array
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var view = new Int8Array(buffer);         view[0] = 0x80;
  return view[0] === -0x80;

};