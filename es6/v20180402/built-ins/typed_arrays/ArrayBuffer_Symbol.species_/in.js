// built-ins / typed arrays / ArrayBuffer[Symbol.species]
module.exports = () => {
  return typeof ArrayBuffer[Symbol.species] === 'function';

};