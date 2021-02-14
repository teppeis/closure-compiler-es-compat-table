// built-ins / Proxy / "deleteProperty" handler
module.exports = () => {
  var proxied = {};
  var passed = false;
  delete new Proxy(proxied, {
    deleteProperty: function (t, k) {
      passed = t === proxied && k === "foo";
    }
  }).foo;
  return passed;

};