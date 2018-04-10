// built-ins / Proxy / "setPrototypeOf" handler invariant
module.exports = function() {
  var passed = false;
  new Proxy({},{});
  Object.setPrototypeOf({},{});
  // If the target object is not extensible, the argument value must be the
  // same as the result of [[GetPrototypeOf]] applied to target object.
  try {
    Object.setPrototypeOf(
      new Proxy(Object.preventExtensions({}), {
        setPrototypeOf: function () {
          passed = true;
          return true;
        }
      }),{});
    return false;
  } catch(e) {}
  return passed;

};