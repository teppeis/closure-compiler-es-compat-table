// built-in extensions / function "name" property / class expressions
module.exports = function() {
return class foo {}.name === "foo" &&
          typeof class bar { static name() {} }.name === "function";
      
};