// Proxy: "isExtensible" handler invariant
module.exports = function() {
var passed = false;
        new Proxy({},{});
        // [[IsExtensible]] applied to the proxy object must return the same value
        // as [[IsExtensible]] applied to the proxy object's target object with the same argument.
        try {
          Object.isExtensible(new Proxy({}, {
            isExtensible: function (t) {
              passed = true;
              return false;
            }
          }));
          return false;
        } catch(e) {}
        try {
          Object.isExtensible(new Proxy(Object.preventExtensions({}), {
            isExtensible: function (t) {
              return true;
            }
          }));
          return false;
        } catch(e) {}
        return true;
      
};