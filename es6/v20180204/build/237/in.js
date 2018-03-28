// typed arrays: Uint16Array
module.exports = function() {
var buffer = new ArrayBuffer(64);
        var view = new Uint16Array(buffer);       view[0] = 0x10000;
        return view[0] === 0;
      
};