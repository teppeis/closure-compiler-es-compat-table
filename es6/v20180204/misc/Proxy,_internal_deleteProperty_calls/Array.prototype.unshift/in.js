// misc / Proxy, internal 'deleteProperty' calls / Array.prototype.unshift
module.exports = function() {
// Array.prototype.unshift -> DeletePropertyOrThrow -> [[Delete]]
        var del = [];
        var p = new Proxy([0,0,,0,,0], { deleteProperty: function(o, v) { del.push(v); return delete o[v]; }});
        p.unshift(0);
        return del + '' === "5,3";
      
};