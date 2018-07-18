// candidate (stage 3) / BigInt / DataView.prototype.getBigUint64
module.exports = () => {
  return typeof DataView.prototype.getBigUint64 === 'function';

};