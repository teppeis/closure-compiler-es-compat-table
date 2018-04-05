// built-ins / typed arrays / DataView (Int32)
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setInt32(0, 0x80000000);
  return view.getInt32(0) === -0x80000000;
};
