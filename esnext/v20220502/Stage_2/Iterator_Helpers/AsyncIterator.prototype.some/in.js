// Stage 2 / Iterator Helpers / AsyncIterator.prototype.some
module.exports = (asyncTestPassed) => {
  (async function*() { yield * [1, 2, 3] })().some(it => typeof it === 'number').then(it => {
    if (it === true) asyncTestPassed();
  });

};