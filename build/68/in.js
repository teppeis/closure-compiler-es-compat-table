// destructuring: parenthesised left-hand-side is a syntax error
module.exports = function() {

        var a, b;
        ({a,b} = {a:1,b:2});
        try {
          eval("({a,b}) = {a:3,b:4};");
        }
        catch(e) {
          return a === 1 && b === 2;
        }
      
};