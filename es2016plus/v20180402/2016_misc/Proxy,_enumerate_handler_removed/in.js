// 2016 misc / Proxy, "enumerate" handler removed
module.exports = function() {
  var passed = true;
  var proxy = new Proxy(
    {},
    {
      enumerate: function() {
        passed = false;
      }
    }
  );
  for (var key in proxy); // Should not throw, nor execute the 'enumerate' method.
  return passed;
};
