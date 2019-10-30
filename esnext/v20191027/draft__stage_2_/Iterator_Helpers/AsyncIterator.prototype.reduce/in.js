// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.reduce
module.exports = (asyncTestPassed) => {
  (async function*() { yield * [1, 2, 3] })().reduce((a, b) => a + b).then(it => {
    if (it === 6) asyncTestPassed();
  });

};