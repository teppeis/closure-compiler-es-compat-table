// typed arrays (DataView)
module.exports = function() {

    var buffer = new ArrayBuffer(64);
    var view = new DataView(buffer);
    var passed = true;

    view.setInt8 (0, 0x80);        passed &= view.getInt8(0)   === -0x80;
    view.setUint8(0, 0x100);       passed &= view.getUint8(0)  === 0;
    view.setInt16(0, 0x8000);      passed &= view.getInt16(0)  === -0x8000;
    view.setUint16(0,0x10000);     passed &= view.getUint16(0) === 0;
    view.setInt32(0, 0x80000000);  passed &= view.getInt32(0)  === -0x80000000;
    view.setUint32(0,0x100000000); passed &= view.getUint32(0) === 0;
    view.setFloat32(0, 0.1);       passed &= view.getFloat32(0)=== 0.10000000149011612;
    view.setFloat64(0, 0.1);       passed &= view.getFloat64(0)=== 0.1;
    return passed;
  
};