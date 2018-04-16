// built-ins / typed arrays / Uint32Array
module.exports = () => {
  var buffer = new ArrayBuffer(64);
  var view = new Uint32Array(buffer);       view[0] = 0x100000000;
  return view[0] === 0;

};