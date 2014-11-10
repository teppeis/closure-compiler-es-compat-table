// function "name" property: accessor properties
module.exports = function() {

        var o = { get foo(){}, set foo(){} };
        var descriptor = Object.getOwnPropertyDescriptor(o, "foo");
        return descriptor.get.name === "get foo" &&
               descriptor.get.name === "set foo";
      
};