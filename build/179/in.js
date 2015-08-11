// typed arrays: Uint8Array
module.exports = function() {

        var buffer = new ArrayBuffer(64);
        var view = new Uint8Array(buffer);        view[0] = 0x100;
        return view[0] === 0;
      
};