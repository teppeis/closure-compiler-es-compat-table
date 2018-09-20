// built-ins / typed arrays / DataView (Float64)
module.exports = () => {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setFloat64(0, 0.1);
  return view.getFloat64(0) === 0.1;

};