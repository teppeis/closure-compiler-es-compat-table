// 2017 features / async functions / async arrow functions in methods, classes
module.exports = (asyncTestPassed) => {
  function doSomething(callback) {
    callback();
  }
  class C {
    a(){
      doSomething(async () => {
        await 1;
        asyncTestPassed();
      });
    }
  };
  var p = new C().a();

};