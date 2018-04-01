// misc / Proxy, internal 'get' calls / RegExp.prototype[Symbol.split]
module.exports = function() {
// RegExp.prototype[Symbol.split] -> Get -> [[Get]]
        var get = [];
        var constructor = Function();
        constructor[Symbol.species] = Object;
        var p = new Proxy({ constructor: constructor, flags: '', exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
        RegExp.prototype[Symbol.split].call(p, "");
        return get + '' === "constructor,flags,exec";
      
};