// 2021 features / Promise.any / AggregateError
module.exports = (asyncTestPassed) => {
  Promise.any([
    Promise.reject(1),
    Promise.reject(2),
    Promise.reject(3)
  ]).catch(error => {
    if (error instanceof AggregateError && error.errors.length === 3) asyncTestPassed();
  });

};