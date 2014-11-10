// Symbol: new Symbol() throws
module.exports = function() {

        var symbol = Symbol();
        try {
          new Symbol();
        } catch(e) {
          return true;
        }
      
};