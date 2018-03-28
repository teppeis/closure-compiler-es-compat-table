// rest parameters: can't be used in setters
module.exports = function() {
return (function (...args) {
          try {
            eval("({set e(...args){}})");
          } catch(e) {
            return true;
          }
        }());
      
};