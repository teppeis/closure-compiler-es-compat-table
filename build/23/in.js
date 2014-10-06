// typed arrays
module.exports = function() {

    var buffer = new ArrayBuffer(64);
    var passed = true;
    var view;

    // Check that each int type overflows as expected.
    view = new Int8Array(buffer);         view[0] = 0x80;
    passed &= view[0] === -0x80;
    view = new Uint8Array(buffer);        view[0] = 0x100;
    passed &= view[0] === 0;
    view = new Uint8ClampedArray(buffer); view[0] = 0x100;
    passed &= view[0] === 0xFF;
    view = new Int16Array(buffer);        view[0] = 0x8000;
    passed &= view[0] === -0x8000;
    view = new Uint16Array(buffer);       view[0] = 0x10000;
    passed &= view[0] === 0;
    view = new Int32Array(buffer);        view[0] = 0x80000000;
    passed &= view[0] === -0x80000000;
    view = new Uint32Array(buffer);       view[0] = 0x100000000;
    passed &= view[0] === 0;
    // Check that each float type loses precision as expected.
    view = new Float32Array(buffer);      view[0] = 0.1;
    passed &= view[0] === 0.10000000149011612;
    view = new Float64Array(buffer);      view[0] = 0.1;
    passed &= view[0] === 0.1;
    return passed;
  
}