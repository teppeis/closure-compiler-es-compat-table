// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.filter
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  toArray(async function*() { yield * [1, 2, 3] }().filter(it => it % 2)).then(it => {
    if (it.join() === '1,3') asyncTestPassed();
  });

};