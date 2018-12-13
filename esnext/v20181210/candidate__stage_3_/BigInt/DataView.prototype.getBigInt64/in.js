// candidate (stage 3) / BigInt / DataView.prototype.getBigInt64
module.exports = () => {
  return typeof DataView.prototype.getBigInt64 === 'function';

};