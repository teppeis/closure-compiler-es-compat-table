// Proxy: "isExtensible" handler
module.exports = function() {

        var proxied = {};
        var passed = false;
        Object.isExtensible(
          new Proxy(proxied, {
            isExtensible: function (t) {
              passed = t === proxied; return true;
            }
          })
        );
        return passed;
      
};