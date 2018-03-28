// Proxy: "deleteProperty" handler invariant
module.exports = function() {
var passed = false;
        new Proxy({},{});
        // A property cannot be reported as deleted, if it exists as a non-configurable
        // own property of the target object.
        var proxied = {};
        Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
        try {
          delete new Proxy(proxied, {
            deleteProperty: function () {
              passed = true;
              return true;
            }
          }).foo;
          return false;
        } catch(e) {}
        return passed;
      
};