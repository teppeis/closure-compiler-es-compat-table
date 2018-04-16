// 2017 features / async functions / async function constructor
module.exports = (asyncTestPassed) => {
  var a = async function (){}.constructor("return 'foo';");
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