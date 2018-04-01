// built-ins / Promise / Promise.race, generic iterables
module.exports = function() {
  var fulfills = Promise.race(
    global.__createIterableObject([
      new Promise(function(resolve) {
        setTimeout(resolve, 1000, "foo");
      }),
      new Promise(function(_, reject) {
        setTimeout(reject, 2000, "bar");
      })
    ])
  );
  var rejects = Promise.race(
    global.__createIterableObject([
      new Promise(function(_, reject) {
        setTimeout(reject, 1000, "baz");
      }),
      new Promise(function(resolve) {
        setTimeout(resolve, 2000, "qux");
      })
    ])
  );
  var score = 0;
  fulfills.then(function(result) {
    score += result === "foo";
    check();
  });
  rejects.catch(function(result) {
    score += result === "baz";
    check();
  });

  function check() {
    if (score === 2) asyncTestPassed();
  }
};
$jscomp.initSymbolIterator();
