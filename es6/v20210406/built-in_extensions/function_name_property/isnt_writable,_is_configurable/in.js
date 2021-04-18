// built-in extensions / function "name" property / isn't writable, is configurable
module.exports = () => {
  var descriptor = Object.getOwnPropertyDescriptor(function f(){},"name");
  return descriptor.enumerable   === false &&
descriptor.writable     === false &&
descriptor.configurable === true;

};