// built-ins / Reflect / Reflect.construct, Promise subclassing
module.exports = function() {
  function F() {}
  var p1 = Reflect.construct(
    Promise,
    [
      function(resolve, reject) {
        resolve("foo");
      }
    ],
    F
  );
  var p2 = Reflect.construct(
    Promise,
    [
      function(resolve, reject) {
        reject("quux");
      }
    ],
    F
  );
  var score = +(p1 instanceof F && p2 instanceof F);

  function thenFn(result) {
    score += result === "foo";
    check();
  }
  function catchFn(result) {
    score += result === "quux";
    check();
  }
  function shouldNotRun(result) {
    score = -Infinity;
  }

  p1.then = p2.then = Promise.prototype.then;
  p1.catch = p2.catch = Promise.prototype.catch;

  p1.then(thenFn, shouldNotRun);
  p2.then(shouldNotRun, catchFn);
  p1.catch(shouldNotRun);
  p2.catch(catchFn);

  function check() {
    if (score === 4) asyncTestPassed();
  }
};
