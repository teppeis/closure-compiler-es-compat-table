// built-ins / typed arrays / %TypedArray%.prototype.subarray
module.exports = function() {
return typeof Int8Array.prototype.subarray === "function" &&
    typeof Uint8Array.prototype.subarray === "function" &&
    typeof Uint8ClampedArray.prototype.subarray === "function" &&
    typeof Int16Array.prototype.subarray === "function" &&
    typeof Uint16Array.prototype.subarray === "function" &&
    typeof Int32Array.prototype.subarray === "function" &&
    typeof Uint32Array.prototype.subarray === "function" &&
    typeof Float32Array.prototype.subarray === "function" &&
    typeof Float64Array.prototype.subarray === "function";

};