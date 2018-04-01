// built-ins / typed arrays / Uint8ClampedArray
module.exports = function() {
var buffer = new ArrayBuffer(64);
        var view = new Uint8ClampedArray(buffer); view[0] = 0x100;
        return view[0] === 0xFF;
      
};