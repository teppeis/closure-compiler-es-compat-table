// Proxy: "defineProperty" handler
module.exports = function() {

        var proxied = {};
        var passed = false;
        Object.defineProperty(
          new Proxy(proxied, {
            defineProperty: function (t, k, d) {
              passed = t === proxied && k === "foo" && d.value === 5;
            }
          }),
          "foo",
          { value: 5 }
        );
        return passed;
      
};