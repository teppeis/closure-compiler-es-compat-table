// built-ins / Proxy / "apply" handler invariant
module.exports = function() {
  var passed = false;
  new Proxy(function(){}, {
    apply: function () { passed = true; }
  })();
  // A Proxy exotic object only has a [[Call]] internal method if the
  // initial value of its [[ProxyTarget]] internal slot is an object
  // that has a [[Call]] internal method.
  try {
    new Proxy({}, {
      apply: function () {}
    })();
    return false;
  } catch(e) {}
  return passed;

};