// function "name" property: isn't writable, is configurable
module.exports = function() {

        var descriptor = Object.getOwnPropertyDescriptor(function(){},"name");
        return descriptor.enumerable   === false &&
               descriptor.writable     === false &&
               descriptor.configurable === true;
      
};