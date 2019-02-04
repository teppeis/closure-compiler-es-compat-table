// strawman (stage 0) / Promise.any
module.exports = (asyncTestPassed) => {
  Promise.any([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
  ]).then(it => {
    if (it === 1) asyncTestPassed();
  });

};