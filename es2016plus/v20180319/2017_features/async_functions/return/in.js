// 2017 features / async functions / return
module.exports = function(asyncTestPassed) {
  async function a(){
    return "foo";
  }
  var p = a();
  if (!(p instanceof Promise)) {
    return false;
  }
  p.then(function(result) {
    if (result === "foo") {
      asyncTestPassed();
    }
  });

};