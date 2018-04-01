// built-ins / typed arrays / Float64Array
module.exports = function() {
var buffer = new ArrayBuffer(64);
        var view = new Float64Array(buffer);       view[0] = 0.1;
        return view[0] === 0.1;
      
};