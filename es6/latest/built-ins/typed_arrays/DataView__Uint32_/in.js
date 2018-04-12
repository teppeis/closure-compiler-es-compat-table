// built-ins / typed arrays / DataView (Uint32)
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setUint32(0, 0x100000000);
  return view.getUint32(0) === 0;

};