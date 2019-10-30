// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.asIndexedPairs
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  toArray((async function*() { yield * [1, 2, 3] })().asIndexedPairs()).then(it => {
    if (it.join() === '0,1,1,2,2,3') asyncTestPassed();
  });

};