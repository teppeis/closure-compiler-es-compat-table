// draft (stage 2) / Iterator Helpers / AsyncIterator.prototype.every
module.exports = (asyncTestPassed) => {
  (async function*() { yield * [1, 2, 3] })().every(it => typeof it === 'number').then(it => {
    if (it === true) asyncTestPassed();
  });

};