// Stage 2 / Iterator Helpers / AsyncIterator.prototype.flatMap
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  toArray(async function*() { yield * [1, 2, 3] }().flatMap(it => [it, 0])).then(it => {
    if (it.join() === '1,0,2,0,3,0') asyncTestPassed();
  });

};