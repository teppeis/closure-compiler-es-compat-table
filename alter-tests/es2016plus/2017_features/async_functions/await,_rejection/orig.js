// 2017 features / async functions / await, rejection
module.exports = (asyncTestPassed) => {
  (async function (){
    await Promise.resolve();
    try {
      var a1 = await new Promise(function(_, reject) { setTimeout(reject,800,"foo"); });
    } catch(e) {
      if (e === "foo") {
        asyncTestPassed();
      }
    }
  }());

};