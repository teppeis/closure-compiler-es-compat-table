// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype[@@toStringTag]
module.exports = () => {
  return AsyncIterator.prototype[Symbol.toStringTag] === 'AsyncIterator';

};