// built-ins / Proxy / "has" handler, instances of proxies
module.exports = function() {
  var proxied = {};
  var passed = false;
  "foo" in Object.create(new Proxy(proxied, {
    has: function (t, k) {
      passed = t === proxied && k === "foo";
    }
  }));
  return passed;

};