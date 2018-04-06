// 2017 features / async functions / async methods, classes
module.exports = function(asyncTestPassed) {
  class C {
    async a(){ return await Promise.resolve("foo"); }
  };
  var p = new C().a();
  if (!(p instanceof Promise)) {
    return false;
  }
  p.then(function(result) {
    if (result === "foo") {
      asyncTestPassed();
    }
  });

};