// typed arrays: ArrayBuffer[Symbol.species]
module.exports = function() {
return typeof ArrayBuffer[Symbol.species] === 'function';
      
};