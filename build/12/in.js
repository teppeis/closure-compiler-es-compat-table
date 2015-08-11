// rest parameters: new Function() support
module.exports = function() {

        return new Function("a", "...b",
          "return b instanceof Array && a+b === 'foobar,baz';"
        )('foo','bar','baz');
      
};