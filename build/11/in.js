// const: redefining a const is a syntax error
module.exports = function() {

        const baz = 1;
        try {
          Function("const foo = 1; foo = 2;")();
        } catch(e) {
          return true;
        }
      
};