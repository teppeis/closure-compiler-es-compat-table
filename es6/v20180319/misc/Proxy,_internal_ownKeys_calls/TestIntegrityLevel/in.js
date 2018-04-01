// misc / Proxy, internal 'ownKeys' calls / TestIntegrityLevel
module.exports = function() {
// TestIntegrityLevel -> [[OwnPropertyKeys]]
        var ownKeysCalled = 0;
        var p = new Proxy(Object.preventExtensions({}), { ownKeys: function(o) { ownKeysCalled++; return Object.keys(o); }});
        Object.isFrozen(p);
        return ownKeysCalled === 1;
      
};