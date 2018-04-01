// misc / Proxy, internal 'getOwnPropertyDescriptor' calls / Function.prototype.bind
module.exports = function() {
// Function.prototype.bind -> HasOwnProperty -> [[GetOwnProperty]]
        var gopd = [];
        var p = new Proxy(Function(),
          { getOwnPropertyDescriptor: function(o, v) { gopd.push(v); return Object.getOwnPropertyDescriptor(o, v); }});
        p.bind();
        return gopd + '' === "length";
      
};