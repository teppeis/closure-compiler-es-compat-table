// function "name" property: class static methods
module.exports = function() {

        class C { static foo(){} };
        return C.foo.name === "foo";
      
};