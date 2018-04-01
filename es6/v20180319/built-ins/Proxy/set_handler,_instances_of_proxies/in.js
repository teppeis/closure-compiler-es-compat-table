// built-ins / Proxy / "set" handler, instances of proxies
module.exports = function() {
  var proxied = {};
  var passed = false;
  var proxy = Object.create(
    new Proxy(proxied, {
      set: function(t, k, v, r) {
        passed = t === proxied && k + v === "foobar" && r === proxy;
      }
    })
  );
  proxy.foo = "bar";
  return passed;
};
