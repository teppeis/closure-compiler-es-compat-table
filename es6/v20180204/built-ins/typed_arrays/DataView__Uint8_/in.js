// built-ins / typed arrays / DataView (Uint8)
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setUint8(0, 0x100);
  return view.getUint8(0) === 0;

};