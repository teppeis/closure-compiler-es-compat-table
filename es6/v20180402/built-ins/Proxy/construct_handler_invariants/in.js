// built-ins / Proxy / "construct" handler invariants
module.exports = function() {
  var passed = false;
  new Proxy({}, {});
  // A Proxy exotic object only has a [[Construct]] internal method if the
  // initial value of its [[ProxyTarget]] internal slot is an object
  // that has a [[Construct]] internal method.
  try {
    new new Proxy(
      {},
      {
        construct: function(t, args) {
          return {};
        }
      }
    )();
    return false;
  } catch (e) {}
  // The result of [[Construct]] must be an Object.
  try {
    new new Proxy(function() {}, {
      construct: function(t, args) {
        passed = true;
        return 5;
      }
    })();
    return false;
  } catch (e) {}
  return passed;
};
