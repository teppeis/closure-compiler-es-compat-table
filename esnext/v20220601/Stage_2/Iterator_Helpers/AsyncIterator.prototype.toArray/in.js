// Stage 2 / Iterator Helpers / AsyncIterator.prototype.toArray
module.exports = (asyncTestPassed) => {
  (async function*() { yield * [1, 2, 3] })().toArray().then(it => {
    if (Array.isArray(it) && it.join() === '1,2,3') asyncTestPassed();
  });

};