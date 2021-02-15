// 2020 features / Promise.allSettled
module.exports = (asyncTestPassed) => {
  Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
  ]).then(it => {
    if (
      it.length === 3 &&
it[0].status === 'fulfilled' && it[0].value === 1 &&
it[1].status === 'rejected' && it[1].reason === 2 &&
it[2].status === 'fulfilled' && it[2].value === 3
    ) asyncTestPassed();
  });

};