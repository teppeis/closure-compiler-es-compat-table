// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.find
module.exports = (asyncTestPassed) => {
  (async function*() { yield * [1, 2, 3] })().find(it => it % 2).then(it => {
    if (it === 1) asyncTestPassed();
  });

};