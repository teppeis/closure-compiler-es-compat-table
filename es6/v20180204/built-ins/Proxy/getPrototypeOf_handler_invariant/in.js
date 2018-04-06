// built-ins / Proxy / "getPrototypeOf" handler invariant
module.exports = function() {
  var passed = false;
  new Proxy({},{});
  // If the target object is not extensible, [[GetPrototypeOf]] applied to the proxy object
  // must return the same value as [[GetPrototypeOf]] applied to the proxy object's target object.
  try {
    Object.getPrototypeOf(new Proxy(Object.preventExtensions({}), {
      getPrototypeOf: function () {
        passed = true;
        return {};
      }
    }));
    return false;
  } catch(e) {}
  return passed;

};