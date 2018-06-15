// candidate (stage 3) / BigInt / BigInt64Array
module.exports = () => {
var buffer = new ArrayBuffer(64);
var view = new BigInt64Array(buffer);
view[0] = 0x8000000000000000n;
return view[0] === -0x8000000000000000n;

};