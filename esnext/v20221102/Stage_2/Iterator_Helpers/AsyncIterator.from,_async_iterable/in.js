// Stage 2 / Iterator Helpers / AsyncIterator.from, async iterable
module.exports = (asyncTestPassed) => {
  async function toArray(iterator) {
    const result = [];
    for await (const it of iterator) result.push(it);
    return result;
  }
  const iterator = AsyncIterator.from(async function*() { yield * [1, 2, 3] }());
  if (!('next' in iterator) || !(iterator instanceof AsyncIterator)) return false;
  toArray(iterator).then(it => {
    if (it.join() === '1,2,3') asyncTestPassed();
  });

};