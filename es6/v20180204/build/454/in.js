// function "name" property: class statements
module.exports = function() {
class foo {};
        class bar { static name() {} };
        return foo.name === "foo" &&
          typeof bar.name === "function";
      
};