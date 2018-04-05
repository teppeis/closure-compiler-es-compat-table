// 2018 features / Asynchronous Iterators / for-await-of loops
module.exports = function() {
  var asyncIterable = {};
  asyncIterable[Symbol.asyncIterator] = function() {
    var i = 0;
    return {
      next: function() {
        switch (++i) {
          case 1:
            return Promise.resolve({ done: false, value: "a" });
          case 2:
            return Promise.resolve({ done: false, value: "b" });
        }
        return Promise.resolve({ done: true });
      }
    };
  };

  (async function() {
    var result = "";
    for await (var value of asyncIterable) result += value;
    if (result === "ab") asyncTestPassed();
  })();
};
