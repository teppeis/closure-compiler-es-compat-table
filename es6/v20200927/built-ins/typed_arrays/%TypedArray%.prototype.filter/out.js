module.exports = function() {
  return "function" === typeof Int8Array.prototype.filter && "function" === typeof Uint8Array.prototype.filter && "function" === typeof Uint8ClampedArray.prototype.filter && "function" === typeof Int16Array.prototype.filter && "function" === typeof Uint16Array.prototype.filter && "function" === typeof Int32Array.prototype.filter && "function" === typeof Uint32Array.prototype.filter && "function" === typeof Float32Array.prototype.filter && "function" === typeof Float64Array.prototype.filter;
};

