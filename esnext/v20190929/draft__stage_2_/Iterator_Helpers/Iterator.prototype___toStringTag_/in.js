// draft (stage 2) / Iterator Helpers / Iterator.prototype[@@toStringTag]
module.exports = () => {
  return Iterator.prototype[Symbol.toStringTag] === 'Iterator';

};