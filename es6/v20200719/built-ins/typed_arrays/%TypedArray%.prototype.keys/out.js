module.exports = function() {
  return "function" === typeof Int8Array.prototype.keys && "function" === typeof Uint8Array.prototype.keys && "function" === typeof Uint8ClampedArray.prototype.keys && "function" === typeof Int16Array.prototype.keys && "function" === typeof Uint16Array.prototype.keys && "function" === typeof Int32Array.prototype.keys && "function" === typeof Uint32Array.prototype.keys && "function" === typeof Float32Array.prototype.keys && "function" === typeof Float64Array.prototype.keys;
};

