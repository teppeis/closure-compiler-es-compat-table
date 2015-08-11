module.exports = function() {
  return "function" === typeof Int8Array.prototype.map && "function" === typeof Uint8Array.prototype.map && "function" === typeof Uint8ClampedArray.prototype.map && "function" === typeof Int16Array.prototype.map && "function" === typeof Uint16Array.prototype.map && "function" === typeof Int32Array.prototype.map && "function" === typeof Uint32Array.prototype.map && "function" === typeof Float32Array.prototype.map && "function" === typeof Float64Array.prototype.map;
};

