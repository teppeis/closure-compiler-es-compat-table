// 2017 features / async functions / can await non-Promise values
module.exports = function() {
(async function (){
            await Promise.resolve();
            var e = await "foo";
            if (e === "foo") {
              asyncTestPassed();
            }
          }());
        
};