// built-ins / Proxy / "has" handler invariants
module.exports = () => {
  var passed = false;
  new Proxy({},{});
  // A property cannot be reported as non-existent, if it exists as a
  // non-configurable own property of the target object.
  var proxied = {};
  var proxy = new Proxy(proxied, {
    has: function () {
      passed = true;
      return false;
    }
  });
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    'foo' in proxy;
    return false;
  } catch(e) {}
  // A property cannot be reported as non-existent, if it exists as an
  // own property of the target object and the target object is not extensible.
  proxied.bar = 2;
  Object.preventExtensions(proxied);
  try {
    'bar' in proxy;
    return false;
  } catch(e) {}
  return passed;

};