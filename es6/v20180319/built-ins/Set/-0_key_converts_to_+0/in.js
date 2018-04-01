// built-ins / Set / -0 key converts to +0
module.exports = function() {
var set = new Set();
        set.add(-0);
        var k;
        set.forEach(function (value) {
          k = 1 / value;
        });
        return k === Infinity && set.has(+0);
      
};