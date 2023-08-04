// 2021 features / Promise.any / fulfillment
module.exports = (asyncTestPassed) => {
  Promise.any([
    Promise.reject(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]).then(it => {
    if (it === 2) asyncTestPassed();
  });

};