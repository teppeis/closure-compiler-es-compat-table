// function "name" property: shorthand methods
module.exports = function() {
var o = { foo(){} };
        return o.foo.name === "foo";
      
};