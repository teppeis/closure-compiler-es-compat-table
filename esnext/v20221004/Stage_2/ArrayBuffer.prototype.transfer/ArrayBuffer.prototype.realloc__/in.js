// Stage 2 / ArrayBuffer.prototype.transfer / ArrayBuffer.prototype.realloc()
module.exports = () => {
  const buffer1 = new ArrayBuffer(1024);
  const buffer2 = buffer1.realloc(256);
  return buffer1.byteLength === 0
&& buffer2.byteLength === 256;

};