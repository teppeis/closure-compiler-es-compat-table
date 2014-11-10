// function "name" property: symbol-keyed methods
module.exports = function() {

        var o = {};
        var sym = Symbol("foo");
        var sym2 = Symbol();
        
        o[sym] = function(){};
        o[sym2] = function(){};
        
        return o[sym].name === "[foo]" &&
               o[sym2].name === "";
      
};