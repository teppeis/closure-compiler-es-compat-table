// draft (stage 2) / ArrayBuffer.prototype.transfer / ArrayBuffer.prototype.transfer()
module.exports = () => {
  const buffer1 = new Uint8Array([1, 2]).buffer;
  const buffer2 = buffer1.transfer();
  return buffer1.byteLength === 0
&& buffer2.byteLength === 2;

};