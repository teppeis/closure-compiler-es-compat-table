// built-ins / typed arrays / %TypedArray%.prototype.values
module.exports = () => {
  return typeof Int8Array.prototype.values === "function" &&
typeof Uint8Array.prototype.values === "function" &&
typeof Uint8ClampedArray.prototype.values === "function" &&
typeof Int16Array.prototype.values === "function" &&
typeof Uint16Array.prototype.values === "function" &&
typeof Int32Array.prototype.values === "function" &&
typeof Uint32Array.prototype.values === "function" &&
typeof Float32Array.prototype.values === "function" &&
typeof Float64Array.prototype.values === "function";

};