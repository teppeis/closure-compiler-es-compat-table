// template strings: toString conversion
module.exports = function() {

        var a = {
          toString: function() { return "foo"; },
          valueOf: function() { return "bar"; },
        };
        return `${a}` === "foo";
      
};