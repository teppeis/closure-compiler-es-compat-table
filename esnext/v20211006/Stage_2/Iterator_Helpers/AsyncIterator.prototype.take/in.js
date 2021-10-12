// Stage 2 / Iterator Helpers / AsyncIterator.prototype.take
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  toArray(async function*() { yield * [1, 2, 3] }().take(2)).then(it => {
    if (it.join() === '1,2') asyncTestPassed();
  });

};