// built-ins / Reflect / Reflect.construct sets new.target meta-property
module.exports = function() {
return Reflect.construct(function(a, b, c) {
          if (new.target === Object) {
            this.qux = a + b + c;
          }
        }, ["foo", "bar", "baz"], Object).qux === "foobarbaz";
      
};