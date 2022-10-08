// subclassing / Promise is subclassable / Promise.race
module.exports = (asyncTestPassed) => {
  class P extends Promise {}
  var fulfills = P.race([
    new Promise(function(resolve)   { setTimeout(resolve,1000,"foo"); }),
    new Promise(function(_, reject) { setTimeout(reject, 2000,"bar"); })
  ]);
  var rejects = P.race([
    new Promise(function(_, reject) { setTimeout(reject, 1000,"baz"); }),
    new Promise(function(resolve)   { setTimeout(resolve,2000,"qux"); })
  ]);
  var score = +(fulfills instanceof P);
  fulfills.then(function(result) { score += (result === "foo"); check(); });
  rejects.catch(function(result) { score += (result === "baz"); check(); });
  function check() {
    if (score === 3) asyncTestPassed();
  }

};