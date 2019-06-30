// candidate (stage 3) / BigInt / DataView.prototype.getBigInt64
module.exports = () => {
var buffer = new ArrayBuffer(64);
var view = new DataView(buffer);
view.setBigInt64(0, 1n);
return view.getBigInt64(0) === 1n;

};