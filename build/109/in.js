// Proxy: "setPrototypeOf" handler
module.exports = function() {

        var proxied = {};
        var newProto = {};
        var passed = false;
        Object.setPrototypeOf(
          new Proxy(proxied, {
            setPrototypeOf: function (t, p) {
              passed = t === proxied && p === newProto;
            }
          }),
          newProto
        );
        return passed;
      
};