// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.forEach
module.exports = (asyncTestPassed) => {
  let result = '';
  (async function*() { yield * [1, 2, 3] })().forEach(it => result += it).then(() => {
    if (result === '123') asyncTestPassed();
  });

};