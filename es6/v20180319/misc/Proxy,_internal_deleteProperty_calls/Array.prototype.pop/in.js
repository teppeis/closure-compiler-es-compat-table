// misc / Proxy, internal 'deleteProperty' calls / Array.prototype.pop
module.exports = function() {
// Array.prototype.pop -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.pop();
        return del + '' === "2";
      
};