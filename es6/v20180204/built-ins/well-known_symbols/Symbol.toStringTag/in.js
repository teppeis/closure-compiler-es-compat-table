// built-ins / well-known symbols / Symbol.toStringTag
module.exports = function() {
var a = {};
        a[Symbol.toStringTag] = "foo";
        return (a + "") === "[object foo]";
      
};