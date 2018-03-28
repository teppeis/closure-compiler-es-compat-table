// Proxy: Array.isArray support
module.exports = function() {
return Array.isArray(new Proxy([], {}));
      
};