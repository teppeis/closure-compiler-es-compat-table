// 2020 features / BigInt / BigUint64Array
module.exports = () => {
var buffer = new ArrayBuffer(64);
var view = new BigUint64Array(buffer);
view[0] = 0x10000000000000000n;
return view[0] === 0n;

};