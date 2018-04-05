// built-ins / typed arrays / constructors require new
module.exports = function() {
  var buffer = new ArrayBuffer(64);
  var constructors = [
    "ArrayBuffer",
    "DataView",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array"
  ];
  return constructors.every(function(constructor) {
    try {
      if (constructor in global) {
        global[constructor](constructor === "ArrayBuffer" ? 64 : buffer);
      }
      return false;
    } catch (e) {
      return true;
    }
  });
};
