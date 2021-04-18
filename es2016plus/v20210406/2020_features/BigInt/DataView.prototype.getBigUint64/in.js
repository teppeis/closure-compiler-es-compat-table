// 2020 features / BigInt / DataView.prototype.getBigUint64
module.exports = () => {
var buffer = new ArrayBuffer(64);
var view = new DataView(buffer);
view.setBigUint64(0, 1n);
return view.getBigUint64(0) === 1n;

};