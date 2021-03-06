// 2017 features / async functions / async methods, object literals
module.exports = (asyncTestPassed) => {
  var o = {
    async a(){ return await Promise.resolve("foo"); }
  };
  var p = o.a();
  if (!(p instanceof Promise)) {
    return false;
  }
  p.then(function(result) {
    if (result === "foo") {
      asyncTestPassed();
    }
  });

};