// built-ins / Proxy / "preventExtensions" handler invariant
module.exports = () => {
  var passed = false;
  new Proxy({},{});
  // [[PreventExtensions]] applied to the proxy object only returns true
  // if [[IsExtensible]] applied to the proxy object's target object is false.
  try {
    Object.preventExtensions(new Proxy({}, {
      preventExtensions: function () {
        passed = true;
        return true;
      }
    }));
    return false;
  } catch(e) {}
  return passed;

};