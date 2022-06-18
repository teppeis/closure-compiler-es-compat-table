// Stage 2 / Iterator Helpers / AsyncIterator.prototype.map
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  toArray(async function*() { yield * [1, 2, 3] }().map(it => it * it)).then(it => {
    if (it.join() === '1,4,9') asyncTestPassed();
  });

};