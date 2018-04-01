// built-ins / typed arrays / correct prototype chains
module.exports = function() {
  var constructors = [
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
  var constructor = Object.getPrototypeOf(Int8Array);
  var prototype = Object.getPrototypeOf(Int8Array.prototype);
  if (constructor === Function.prototype || prototype === Object.prototype)
    return false;
  for (var i = 0; i < constructors.length; i += 1) {
    if (
      !(
        constructors[i] in global &&
        Object.getPrototypeOf(global[constructors[i]]) === constructor &&
        Object.getPrototypeOf(global[constructors[i]].prototype) ===
          prototype &&
        Object.getOwnPropertyNames(global[constructors[i]].prototype).sort() +
          "" ===
          "BYTES_PER_ELEMENT,constructor"
      )
    ) {
      return false;
    }
  }
  return true;
};
