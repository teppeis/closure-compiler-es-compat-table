// built-ins / Proxy / "has" handler
module.exports = () => {
  var proxied = {};
  var passed = false;
  "foo" in new Proxy(proxied, {
    has: function (t, k) {
      passed = t === proxied && k === "foo";
    }
  });
  return passed;

};