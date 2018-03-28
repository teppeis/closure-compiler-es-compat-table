// shared memory and atomics: SharedArrayBuffer.prototype.slice
module.exports = function() {
return typeof SharedArrayBuffer.prototype.slice === 'function';
         
};